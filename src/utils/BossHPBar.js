/**
 * Boss HP Tug-of-War bar.
 * Player HP fills from the left (blue), Boss HP fills from the right (red).
 */
export class BossHPBar {
    constructor(scene, x, y, w, h) {
        this.x = x; this.y = y; this.w = w; this.h = h;
        this.bg     = scene.add.graphics();
        this.fill   = scene.add.graphics();
        this.marker = scene.add.text(x, y, '⚔️', { fontSize: '24px' }).setOrigin(0.5);
        this.draw(50);
    }

    draw(playerHP) {
        this.bg.clear();
        this.fill.clear();

        // Outer dark container
        this.bg.fillStyle(0x1e293b, 1);
        this.bg.fillRoundedRect(this.x - this.w / 2 - 4, this.y - this.h / 2 - 4, this.w + 8, this.h + 8, 8);
        this.bg.lineStyle(2.5, 0x475569, 1);
        this.bg.strokeRoundedRect(this.x - this.w / 2 - 4, this.y - this.h / 2 - 4, this.w + 8, this.h + 8, 8);

        // Boss HP (full red background)
        this.fill.fillStyle(0xef4444, 1);
        this.fill.fillRoundedRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h, 6);

        // Player HP (blue overlay from left)
        const fillW = this.w * (playerHP / 100);
        if (fillW > 0) {
            this.fill.fillStyle(0x0ea5e9, 1);
            this.fill.fillRoundedRect(this.x - this.w / 2, this.y - this.h / 2, fillW, this.h, {
                tl: 6, bl: 6, tr: playerHP >= 98 ? 6 : 0, br: playerHP >= 98 ? 6 : 0
            });
        }

        this.marker.setX(this.x - this.w / 2 + fillW);
    }
}
