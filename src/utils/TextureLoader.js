const activeLoads = new Set();

/**
 * Loads missing textures on-demand, then calls onReady.
 * If all textures already exist in cache, onReady fires synchronously.
 *
 * @param {Phaser.Scene} scene
 * @param {Array<{key: string, url: string}>} entries
 * @param {Function} onReady
 */
export function ensureTextures(scene, entries, onReady) {
    const missing = entries.filter(({ key }) => !scene.textures.exists(key));
    if (missing.length === 0) {
        onReady();
        return;
    }

    const keysToWatch = missing.map(e => e.key);
    const resolvedKeys = new Set();
    
    // Check if we need to enqueue any new file loads in Phaser
    const toLoad = missing.filter(e => !activeLoads.has(e.key));
    
    // Mark them as active loads immediately
    toLoad.forEach(e => activeLoads.add(e.key));

    const checkCompletion = () => {
        const allResolved = keysToWatch.every(k => scene.textures.exists(k) || resolvedKeys.has(k));
        if (allResolved) {
            scene.load.off('filecomplete', onFileComplete);
            scene.load.off('loaderror', onLoadError);
            
            // Clean activeLoads for these keys
            keysToWatch.forEach(k => activeLoads.delete(k));
            
            onReady();
        }
    };

    const onFileComplete = (key) => {
        if (keysToWatch.includes(key)) {
            resolvedKeys.add(key);
            checkCompletion();
        }
    };

    const onLoadError = (file) => {
        if (file && keysToWatch.includes(file.key)) {
            console.error(`Failed to load texture: ${file.key}`);
            resolvedKeys.add(file.key);
            checkCompletion();
        }
    };

    scene.load.on('filecomplete', onFileComplete);
    scene.load.on('loaderror', onLoadError);

    if (toLoad.length > 0) {
        toLoad.forEach(({ key, url }) => {
            scene.load.image(key, url);
        });
        scene.load.start();
    } else {
        checkCompletion();
    }
}
