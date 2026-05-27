import * as Phaser from 'phaser';
import { ProgressManager } from '../utils/ProgressManager';
import { ensureTextures } from '../utils/TextureLoader';
import { getFogAlpha } from '../utils/PathLayout';
import { getChapterForLesson, getGroupForChapter } from '../data/chapters';

// Module-level flag: skip the per-def loop after textures are created.
// Resets to false when textures are cleared (pn_done missing = cache evicted).
let _nodeTexturesCreated = false;

// Pre-render gradient circle textures once per game session using Canvas 2D API
function createNodeTextures(scene) {
    if (_nodeTexturesCreated && scene.textures.exists('pn_done')) return;
    _nodeTexturesCreated = true;

    const DEFS = [
        { key: 'pn_done',         r: 38, light: '#34d399', mid: '#10b981', dark: '#064e3b' },
        { key: 'pn_current',      r: 38, light: '#fde68a', mid: '#f59e0b', dark: '#78350f' },
        { key: 'pn_locked',       r: 38, light: '#475569', mid: '#1e293b', dark: '#0f172a' },
        { key: 'pn_boss_done',    r: 44, light: '#fde68a', mid: '#d97706', dark: '#78350f' },
        { key: 'pn_boss_current', r: 44, light: '#fca5a5', mid: '#ef4444', dark: '#7f1d1d' },
        { key: 'pn_boss_locked',  r: 44, light: '#3b1515', mid: '#180505', dark: '#050101' },
    ];

    for (const def of DEFS) {
        if (scene.textures.exists(def.key)) continue;

        const size = def.r * 2 + 2; // +2 so stroke isn't clipped
        const tex  = scene.textures.createCanvas(def.key, size, size);
        const ctx  = tex.context;
        const cx   = size / 2;
        const cy   = size / 2;

        // Clip to circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, def.r, 0, Math.PI * 2);
        ctx.clip();

        // Radial gradient: light source at top-left
        const g = ctx.createRadialGradient(
            cx - def.r * 0.28, cy - def.r * 0.3,  def.r * 0.05,  // inner (bright spot)
            cx + def.r * 0.1,  cy + def.r * 0.15, def.r          // outer (dark edge)
        );
        g.addColorStop(0,    def.light);
        g.addColorStop(0.42, def.mid);
        g.addColorStop(1,    def.dark);

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, size, size);
        ctx.restore();

        tex.refresh();
    }
}

export class PathNode extends Phaser.GameObjects.Container {
    constructor(scene, x, y, index, isUnlocked, stars, currentIndex) {
        super(scene, x, y);
        this.scene = scene;
        this.index = index;
        this.stars = stars;
        this.isUnlocked = isUnlocked;

        this.setDepth(2);

        const fogAlpha = getFogAlpha(index, currentIndex);
        this.setAlpha(fogAlpha);
        if (fogAlpha <= 0) {
            this.setVisible(false);
        }

        this.isBoss = (index % 14 === 13);
        this.radius = this.isBoss ? 44 : 38;

        // Determine state
        if (stars > 0) {
            this.state = 'done';
        } else if (index === currentIndex) {
            this.state = (index > 0) ? 'locked' : 'current';
        } else {
            this.state = 'locked';
        }

        // ── Layer 1: shadow (Graphics, drawn first = behind) ──────────
        this.shadowGfx = scene.add.graphics();
        this.add(this.shadowGfx);
        this._drawShadow();

        // ── Layer 2: gradient circle (pre-rendered Canvas texture) ────
        createNodeTextures(scene);
        this.nodeImage = scene.add.image(0, 0, this._texKey());
        this.add(this.nodeImage);

        // ── Layer 3: stroke + glow rings (Graphics, drawn on top) ─────
        this.strokeGfx = scene.add.graphics();
        this.add(this.strokeGfx);
        this._drawStroke(false);

        // ── Content (emoji / number / boss sprite) ──────────────────────
        if (this.isBoss) {
            const chapter = getChapterForLesson(index);
            const group = getGroupForChapter(chapter);
            const bossTexture = `boss_${group.id}`;

            ensureTextures(scene, [{ key: bossTexture, url: `assets/${bossTexture}.png` }], () => {
                if (scene && this.active) {
                    const bossSprite = scene.add.sprite(0, 0, bossTexture);
                    bossSprite.setDisplaySize(72, 72);
                    if (this.state === 'locked') {
                        bossSprite.setTint(0x334155).setAlpha(0.85);
                        const lockEmoji = scene.add.text(0, 0, '🔒', {
                            fontFamily: 'Segoe UI Emoji, Arial',
                            fontSize: '20px',
                        }).setOrigin(0.5).setAlpha(0.8);
                        this.add(lockEmoji);
                    }
                    this.add(bossSprite);
                    // Ensure lock emoji is drawn on top of the boss sprite
                    if (this.state === 'locked') {
                        const lock = this.list.find(item => item instanceof Phaser.GameObjects.Text && item.text === '🔒');
                        if (lock) this.bringToTop(lock);
                    }
                }
            });
        } else {
            if (this.state === 'locked') {
                const lockEmoji = scene.add.text(0, 0, '🔒', {
                    fontFamily: 'Segoe UI Emoji, Arial',
                    fontSize: '20px',
                }).setOrigin(0.5).setAlpha(0.6);
                this.add(lockEmoji);
            } else {
                const labelText = scene.add.text(0, 0, `${index + 1}`, {
                    fontFamily: 'Outfit, Arial',
                    fontSize: '22px',
                    fontStyle: 'bold',
                    fill: '#ffffff'
                }).setOrigin(0.5);
                labelText.setStroke('#0f172a', 3);
                this.add(labelText);
            }
        }

        // ── Labels below node ─────────────────────────────────────────
        let labelYOffset = this.radius + 12;

        if (this.isBoss && this.state !== 'locked') {
            const bossText = scene.add.text(0, labelYOffset, `BOSS · BÀI ${index + 1}`, {
                fontFamily: 'Outfit, Arial',
                fontSize: '13px',
                fontStyle: 'bold',
                fill: this.state === 'locked' ? '#64748B' : '#FCA5A5'
            }).setOrigin(0.5);
            bossText.setStroke('#0f172a', 3);
            this.add(bossText);
            labelYOffset += 18;
        }

        if (this.state !== 'locked') {
            const starStr = stars === 3 ? '⭐⭐⭐' : stars === 2 ? '⭐⭐☆' : stars === 1 ? '⭐☆☆' : '☆☆☆';
            const starText = scene.add.text(0, labelYOffset, starStr, {
                fontFamily: 'Arial',
                fontSize: '13px',
                fill: '#FFD700'
            }).setOrigin(0.5);
            this.add(starText);
        }

        // ── Pulse animation for current node ──────────────────────────
        if (this.state === 'current') {
            this.scene.tweens.add({
                targets: this,
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 1200,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            this.monkeyVisible = true;
            this.monkeySprite = null;
            this.updateMonkeySkin();
        }

        // ── Interactive zone ──────────────────────────────────────────
        const hitArea = new Phaser.Geom.Circle(this.radius, this.radius, this.radius);
        const zone = scene.add.zone(0, 0, this.radius * 2, this.radius * 2)
            .setInteractive(hitArea, Phaser.Geom.Circle.Contains);
        this.add(zone);

        if (this.state !== 'locked') {
            zone.input.cursor = 'pointer';
        }

        zone.on('pointerover', () => {
            if (this.state === 'locked') return;
            this.setDepth(10);
            this._drawStroke(true);
            this.scene.tweens.killTweensOf(this);
            this.scene.tweens.add({ targets: this, scaleX: 1.1, scaleY: 1.1, duration: 100, ease: 'Power1' });
            if (this.scene.showTooltip) this.scene.showTooltip(this.index, this.x, this.y, this.isBoss);
        });

        zone.on('pointerout', () => {
            if (this.state === 'locked') return;
            this.setDepth(2);
            this._drawStroke(false);
            this.scene.tweens.killTweensOf(this);
            this.scene.tweens.add({
                targets: this, scaleX: 1.0, scaleY: 1.0, duration: 100, ease: 'Power1',
                onComplete: () => {
                    if (this.state === 'current') {
                        this.scene.tweens.add({ targets: this, scaleX: 1.05, scaleY: 1.05, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
                    }
                }
            });
            if (this.scene.hideTooltip) this.scene.hideTooltip();
        });

        zone.on('pointerdown', () => {
            if (this.state === 'locked') return;
            this.scene.tweens.add({ targets: this, scaleX: 0.95, scaleY: 0.95, duration: 50 });
        });

        zone.on('pointerup', () => {
            if (this.state === 'locked') return;
            this.scene.tweens.add({
                targets: this, scaleX: 1.0, scaleY: 1.0, duration: 50,
                onComplete: () => {
                    if (!this.scene.isDraggingRef()) {
                        this.scene.sound.play('key_sound');
                        if (this.isBoss) {
                            this.scene.scene.start('BossScene', { lessonIndex: this.index });
                        } else {
                            this.scene.scene.start('PlayScene', { lessonIndex: this.index });
                        }
                    }
                }
            });
        });

        scene.add.existing(this);
    }

    _texKey() {
        const prefix = this.isBoss ? 'pn_boss_' : 'pn_';
        return prefix + this.state;
    }

    _drawShadow() {
        this.shadowGfx.clear();
        const r  = this.radius;
        const sx = 2, sy = 6;
        // Soft drop shadow: multiple semi-transparent circles, offset down-right
        this.shadowGfx.fillStyle(0x000000, 0.07); this.shadowGfx.fillCircle(sx, sy, r + 10);
        this.shadowGfx.fillStyle(0x000000, 0.10); this.shadowGfx.fillCircle(sx, sy, r + 6);
        this.shadowGfx.fillStyle(0x000000, 0.14); this.shadowGfx.fillCircle(sx, sy, r + 3);
        this.shadowGfx.fillStyle(0x000000, 0.22); this.shadowGfx.fillCircle(sx, sy, r);
    }

    _drawStroke(isHovered) {
        this.strokeGfx.clear();
        const r = this.radius;

        let strokeColor, strokeWidth;

        if (this.isBoss) {
            if (this.state === 'done') {
                strokeColor = isHovered ? 0xFDE68A : 0xb45309; strokeWidth = isHovered ? 4 : 2.5;
            } else if (this.state === 'current') {
                strokeColor = isHovered ? 0xFCA5A5 : 0xfca5a5; strokeWidth = isHovered ? 4 : 2.5;
            } else {
                strokeColor = 0x450a0a; strokeWidth = 1.5;
            }
        } else {
            if (this.state === 'done') {
                strokeColor = isHovered ? 0xA7F3D0 : 0x047857; strokeWidth = isHovered ? 4 : 2;
            } else if (this.state === 'current') {
                strokeColor = isHovered ? 0xFBBF24 : 0xfde68a; strokeWidth = isHovered ? 4 : 2.5;
            } else {
                strokeColor = 0x334155; strokeWidth = 1.5;
            }
        }

        // Glow rings for current node
        if (this.state === 'current' && !isHovered) {
            this.strokeGfx.lineStyle(8, 0xFFD700, 0.10);
            this.strokeGfx.strokeCircle(0, 0, r + 12);
            this.strokeGfx.lineStyle(4, 0xFFD700, 0.25);
            this.strokeGfx.strokeCircle(0, 0, r + 7);
        }

        // Border
        this.strokeGfx.lineStyle(strokeWidth, strokeColor, 1);
        this.strokeGfx.strokeCircle(0, 0, r);
    }

    // Keep old name as alias so any external call still works
    drawCircle(isHovered) {
        this._drawStroke(isHovered);
    }

    updateMonkeySkin() {
        if (this.state !== 'current' && !this.forceMonkey) return;

        const monkeySkin = (this.scene && this.scene.monkeySkin) ? this.scene.monkeySkin : 'monkey_1';

        ensureTextures(this.scene, [{ key: monkeySkin, url: `assets/${monkeySkin}.png` }], () => {
            if (this.scene && this.active) {
                if (this.monkeySprite) {
                    this.monkeySprite.setTexture(monkeySkin);
                    this.monkeySprite.setVisible(this.monkeyVisible);
                } else {
                    this.monkeySprite = this.scene.add.sprite(0, -this.radius - 3, monkeySkin)
                        .setScale(0.10)
                        .setOrigin(0.5);
                    this.monkeySprite.setVisible(this.monkeyVisible);
                    this.add(this.monkeySprite);

                    this.scene.tweens.add({
                        targets: this.monkeySprite,
                        y: this.monkeySprite.y - 3,
                        duration: 1000,
                        yoyo: true,
                        repeat: -1,
                        ease: 'Sine.easeInOut'
                    });
                }
            }
        });
    }

    setMonkeyVisible(visible) {
        this.monkeyVisible = visible;
        if (this.monkeySprite) {
            this.monkeySprite.setVisible(visible);
        }
    }

    unlock() {
        if (this.state !== 'locked') return;

        // Initialize monkey skin and sprite
        this.monkeyVisible = false;
        this.monkeySprite = null;
        this.forceMonkey = true;
        this.updateMonkeySkin();
        this.forceMonkey = false;

        // 1. Create fading active background
        const nextTexKey = this.isBoss ? 'pn_boss_current' : 'pn_current';
        const newImage = this.scene.add.image(0, 0, nextTexKey).setAlpha(0);
        this.addAt(newImage, this.list.indexOf(this.nodeImage) + 1);

        // 2. Create fading active stroke graphics
        const r = this.radius;
        const newStrokeGfx = this.scene.add.graphics().setAlpha(0);
        this.addAt(newStrokeGfx, this.list.indexOf(this.strokeGfx) + 1);

        const strokeColor = this.isBoss ? 0xfca5a5 : 0xfde68a;
        const strokeWidth = 2.5;

        // Draw border
        newStrokeGfx.lineStyle(strokeWidth, strokeColor, 1);
        newStrokeGfx.strokeCircle(0, 0, r);

        // Draw active glow rings
        newStrokeGfx.lineStyle(8, 0xFFD700, 0.10);
        newStrokeGfx.strokeCircle(0, 0, r + 12);
        newStrokeGfx.lineStyle(4, 0xFFD700, 0.25);
        newStrokeGfx.strokeCircle(0, 0, r + 7);

        // Crossfade background and border graphics
        this.scene.tweens.add({
            targets: [newImage, newStrokeGfx],
            alpha: 1,
            duration: 1800,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                this.nodeImage.destroy();
                this.nodeImage = newImage;

                this.strokeGfx.destroy();
                this.strokeGfx = newStrokeGfx;

                this.state = 'current';
            }
        });

        // 3. Lock icon fade out
        const lockText = this.list.find(item => item instanceof Phaser.GameObjects.Text && item.text === '🔒');
        if (lockText) {
            this.scene.tweens.add({
                targets: lockText,
                alpha: 0,
                scaleX: 1.5,
                scaleY: 1.5,
                duration: 300,
                onComplete: () => lockText.destroy()
            });
        }

        // 4. Zoom in label text or animate boss sprite
        if (!this.isBoss) {
            const labelText = this.scene.add.text(0, 0, `${this.index + 1}`, {
                fontFamily: 'Outfit, Arial',
                fontSize: '22px',
                fontStyle: 'bold',
                fill: '#ffffff'
            }).setOrigin(0.5).setScale(0.5).setAlpha(0);
            labelText.setStroke('#0f172a', 3);
            this.add(labelText);

            this.scene.tweens.add({
                targets: labelText,
                alpha: 1,
                scaleX: 1,
                scaleY: 1,
                duration: 400,
                ease: 'Back.easeOut'
            });
        } else {
            const bossSprite = this.list.find(item => item instanceof Phaser.GameObjects.Sprite && item.texture.key.startsWith('boss_'));
            if (bossSprite) {
                bossSprite.clearTint().setAlpha(1);
                this.scene.tweens.add({
                    targets: bossSprite,
                    scaleX: 0.17,
                    scaleY: 0.17,
                    duration: 300,
                    yoyo: true,
                    ease: 'Back.easeOut'
                });
            }

            const bossText = this.scene.add.text(0, this.radius + 12, `BOSS · BÀI ${this.index + 1}`, {
                fontFamily: 'Outfit, Arial',
                fontSize: '13px',
                fontStyle: 'bold',
                fill: '#FCA5A5'
            }).setOrigin(0.5).setAlpha(0);
            bossText.setStroke('#0f172a', 3);
            this.add(bossText);

            this.scene.tweens.add({
                targets: bossText,
                alpha: 1,
                duration: 300
            });
        }

        // 5. Star ratings fade in
        const labelYOffset = this.radius + 12 + (this.isBoss ? 18 : 0);
        const starText = this.scene.add.text(0, labelYOffset, '☆☆☆', {
            fontFamily: 'Arial',
            fontSize: '13px',
            fill: '#FFD700'
        }).setOrigin(0.5).setAlpha(0);
        this.add(starText);

        this.scene.tweens.add({
            targets: starText,
            alpha: 1,
            duration: 300
        });

        // 6. Pulse scaling animation
        this.scene.tweens.add({
            targets: this,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // 7. Make zone interactive
        const zone = this.list.find(item => item instanceof Phaser.GameObjects.Zone);
        if (zone && zone.input) {
            zone.input.cursor = 'pointer';
        }
    }
}
