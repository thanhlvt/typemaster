/**
 * Shows the pre-battle warning banner + "SẴN SÀNG" ready animation for BossScene.
 *
 * @param {Phaser.Scene} scene
 * @param {object} group         - chapter group object { name, ... }
 * @param {number} introTime     - seconds to show warning before starting
 * @param {Function} onReady     - called when intro finishes; receives bossMusic reference
 * @returns {Phaser.Sound.BaseSound|null} bossMusic (may be null if audio not loaded)
 */
export function showBossIntro(scene, group, introTime, onReady) {
    const { width, height } = scene.scale;
    const container = scene.add.container(0, 0).setDepth(200);

    // Red warning banner
    const bannerBg = scene.add.graphics();
    bannerBg.fillStyle(0x7f1d1d, 0.9);
    bannerBg.fillRect(0, height * 0.35, width, 140);
    bannerBg.lineStyle(4, 0xfca5a5, 1);
    bannerBg.lineBetween(0, height * 0.35,       width, height * 0.35);
    bannerBg.lineBetween(0, height * 0.35 + 140, width, height * 0.35 + 140);
    container.add(bannerBg);

    const title = scene.add.text(width / 2, height * 0.35 + 40,
        `⚠️ CẢNH BÁO: BOSS ${group.name.toUpperCase()} ⚠️`, {
        fontFamily: 'Outfit, Arial', fontSize: '32px', fontStyle: 'bold', fill: '#ffffff'
    }).setOrigin(0.5);
    title.setStroke('#000000', 6);
    container.add(title);

    const subtitle = scene.add.text(width / 2, height * 0.35 + 90,
        'Hạ gục Boss trong 60 giây để nhận thưởng lớn!', {
        fontFamily: 'Arial', fontSize: '18px', fontStyle: 'bold', fill: '#fecaca'
    }).setOrigin(0.5);
    subtitle.setStroke('#000000', 4);
    container.add(subtitle);

    // Red alarm flash
    const flash = scene.add.rectangle(0, 0, width, height, 0xff0000, 0.25)
        .setOrigin(0).setDepth(190).setVisible(false);
    scene.tweens.add({
        targets: flash, visible: true, yoyo: true, repeat: 5, duration: 250,
        onComplete: () => flash.destroy()
    });

    // Stop map music, start boss music
    ['level_sound', 'music_1', 'music_2', 'music_3', 'music_4', 'music_5', 'music_6', 'music_7']
        .forEach(k => scene.sound.stopByKey(k));

    let bossMusic = null;
    if (scene.cache.audio.exists('boss_sound')) {
        bossMusic = scene.sound.add('boss_sound', { volume: 0.4, loop: true });
        bossMusic.play();
    }

    // Hide banner after introTime, then show ready animation
    scene.time.delayedCall(introTime * 1000, () => {
        scene.tweens.add({
            targets: container, alpha: 0, scaleY: 0, y: height * 0.42, duration: 300,
            onComplete: () => {
                container.destroy();
                _showReadyAnimation(scene, width, height, () => onReady(bossMusic));
            }
        });
    });

    return bossMusic;
}

function _showReadyAnimation(scene, width, height, onComplete) {
    const text = scene.add.text(width / 2, height / 2, 'SẴN SÀNG', {
        fontFamily: 'Outfit, Arial Black, Arial',
        fontSize: '74px', fontStyle: 'bold', fill: '#FBBF24'
    }).setOrigin(0.5).setScale(0).setAlpha(0).setDepth(201);
    text.setStroke('#000000', 10);
    text.setShadow(0, 4, 'rgba(0,0,0,0.8)', 6, true, true);

    scene.tweens.add({
        targets: text, scaleX: 1, scaleY: 1, alpha: 1,
        duration: 500, ease: 'Back.easeOut',
        onComplete: () => {
            if (scene.cache.audio.exists('blob')) scene.sound.play('blob');
            scene.time.delayedCall(600, () => {
                scene.tweens.add({
                    targets: text, scaleX: 2.2, scaleY: 2.2, alpha: 0,
                    duration: 350, ease: 'Cubic.easeIn',
                    onComplete: () => { text.destroy(); onComplete(); }
                });
            });
        }
    });
}
