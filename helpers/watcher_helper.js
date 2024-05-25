const fs = require('fs');
const path = require('path');

/**
 * Watches a directory for changes and clears the require cache for changed files.
 * @param {string} dir - The directory to watch.
 */
function watchAndClearCache(dir) {
  fs.watch(dir, (eventType, fileName) => {
    if (fileName) {
      const filePath = path.join(dir, fileName);
      console.log(`Deleting require cache for ${filePath}`);
      delete require.cache[require.resolve(filePath)];
    }
  });
}

module.exports = {
  watchAndClearCache,
};
