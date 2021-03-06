var fs = require('fs');
var path = require('path');
var ig = require('imagemagick');
var colors = require('colors');
var _ = require('underscore');
var Q = require('q');
var nodeFs = require('node-fs');

/**
 * Check which platforms are added to the project and return their icon names and sized
 *
 * @param  {String} projectName
 * @return {Promise} resolves with an array of platforms
 */
var getPlatformIcons = function () {
    var deferred = Q.defer();
    var platforms = [];

    if (settings.PLATFORMS.indexOf('ios') !== -1) {
        platforms.push({
            name: 'ios',
            isAdded: true,
            iconsPath: 'resources/ios/icon',
            icons: [
                // Default icon (avoid Apple submit error ITMS-90032)
                { name: 'icon.png', size: 57 },
                // iPhone / iPod Touch -->
                { name: 'icon@2x.png', size: 114 },
                // iOS 6.1, Spotlight Icon -->
                { name: 'icon-40.png', size: 40 },
                { name: 'icon-40@2x.png', size: 80 },
                { name: 'icon-40@3x.png', size: 120 },
                // iPad Spotlight and Settings Icon -->
                { name: 'icon-50.png', size: 50 },
                { name: 'icon-50@2x.png', size: 100 },
                // iOS 7.0+, iPhone / iPod Touch  -->
                { name: 'icon-60.png', size: 60 },
                // iPhone 6s, iPhone 6, iPhone SE
                { name: 'icon-60@2x.png', size: 120 },
                // iOS 8.0+, iPhone 6s Plus, iPhone 6 Plus
                { name: 'icon-60@3x.png', size: 180 },
                // iPad -->
                { name: 'icon-72.png', size: 72 },
                { name: 'icon-72@2x.png', size: 144 },
                // iPad -->
                { name: 'icon-76.png', size: 76 },
                // iPad, iPad mini
                { name: 'icon-76@2x.png', size: 152 },
                // iPad Pro
                { name: 'icon-83.5@2x.png', size: 167 },
                // iPhone Spotlight and Settings Icon -->
                { name: 'icon-small.png', size: 29 },
                { name: 'icon-small@2x.png', size: 58 },
                { name: 'icon-small@3x.png', size: 87 }
                // Other sizes -->
                // { name:'icon-50-3x.png', size:150 },
                // { name:'icon-57-3x.png', size:171 },
                // { name:'icon-72-3x.png', size:216 },
                // { name:'icon-76-3x.png', size:228 },
                // { name:'icon-48.png', size:48 },
                // { name:'icon-48-2x.png', size:96 },
                // { name:'icon-58.png', size:58 },
                // { name:'icon-58-2x.png', size:116 },
                // { name:'icon-58-3x.png', size:174 },
                // { name:'icon-64.png', size:64 },
                // { name:'icon-64-2x.png', size:128 },
                // { name:'icon-64-3x.png', size:192 },
                // { name:'icon-83.5.png', size:83.5 },
                // { name:'icon-320.png', size:320 },
            ]
        });
    }

    //ok
    if (settings.PLATFORMS.indexOf('android') !== -1) {
        platforms.push({
            name: 'android',
            iconsPath: 'resources/android/icon/',
            isAdded: true,
            icons: [
                { name: 'drawable-ldpi-icon.png', size: 36, density: 'ldpi' },
                { name: 'drawable-mdpi-icon.png', size: 48, density: 'mdpi' },
                { name: 'drawable-hdpi-icon.png', size: 72, density: 'hdpi' },
                { name: 'drawable-xhdpi-icon.png', size: 96, density: 'xhdpi' },
                { name: 'drawable-xxhdpi-icon.png', size: 144, density: 'xxhdpi' },
                { name: 'drawable-xxxhdpi-icon.png', size: 192, density: 'xxxhdpi' },
            ]
        });
    }

    //ok
    if (settings.PLATFORMS.indexOf('wp8') !== -1) {
        platforms.push({
            name: 'wp8',
            iconsPath: 'resources/wp8/icon/',
            isAdded: true,
            icons: [
                { name: 'ApplicationIcon.png', size: 99 },
                { name: 'Background.png', size: 159 },
            ]
        });
    }

    //ok
    if (settings.PLATFORMS.indexOf('windows') !== -1) {
        platforms.push({
            name: 'windows',
            iconsPath: 'resources/windows/icon/',
            isAdded: true,
            icons: [
                { name: 'Square150x150Logo.scale-100.png', size: 150 },
                { name: 'Square150x150Logo.scale-240.png', size: 360 },
                { name: 'Square30x30Logo.scale-100.png', size: 30 },
                { name: 'Square310x310Logo.scale-100.png', size: 310 },
                { name: 'Square44x44Logo.scale-240.png', size: 106 },
                { name: 'Square70x70Logo.scale-100.png', size: 70 },
                { name: 'Square71x71Logo.scale-240.png', size: 170 },
                { name: 'StoreLogo.scale-100.png', size: 50 },
                { name: 'StoreLogo.scale-240.png', size: 120 },
                { name: 'Wide310x150Logo.scale-100.png', size: 310 },
                { name: 'Wide310x150Logo.scale-240.png', size: 744 },
            ]
        });
    }

    //ok
    if (settings.PLATFORMS.indexOf('store') !== -1) {
        platforms.push({
            name: 'store',
            iconsPath: 'store/icons/',
            isAdded: true,
            icons: [
                { path: './android/', name: "icon-512.png", size: 512 },
                { path: './wp8/', name: "icon-300.png", size: 300 },
                { path: './ios/', name: "icon-1024.jpg", size: 1024 } // App Store
            ]
        });
    }

    deferred.resolve(platforms);
    return deferred.promise;
};

/**
 * Check which platforms are added to the project and return their splash screen names and sizes
 *
 * @param  {String} projectName
 * @return {Promise} resolves with an array of platforms
 */
var getPlatformSplashs = function () {
    var deferred = Q.defer();
    var platforms = [];

    //ok
    if (settings.PLATFORMS.indexOf('ios') !== -1) {
        platforms.push({
            name: 'ios',
            isAdded: true,
            splashPath: 'resources/ios/splash/',
            splash: [
                { name: "Default-568h@2x~iphone.png", width: 640, height: 1136 },           // iPhone 5 Retina
                { name: "Default-667h.png", width: 750, height: 1334 },     // iPhone 6
                { name: "Default-736h.png", width: 1242, height: 2208 },    // iPhone 6 Plus
                { name: "Default-Landscape-736h.png", width: 2208, height: 1242 },    // iPhone 6 Plus
                { name: "Default-Landscape@~ipadpro.png", width: 2732, height: 2048 }, // iPad Pro
                { name: "Default-Landscape@2x~ipad.png", width: 2048, height: 1536 },       // iPad Retina
                { name: "Default-Landscape~ipad.png", width: 1024, height: 768 },           // iPad
                { name: "Default-Portrait@~ipadpro.png", width: 2048, height: 2732 }, // iPad Pro
                { name: "Default-Portrait@2x~ipad.png", width: 1536, height: 2048 },        // iPad Retina
                { name: "Default-Portrait~ipad.png", width: 768, height: 1024 },            // iPad
                { name: "Default@2x~iphone.png", width: 640, height: 960 },        // iPhone Retina
                { name: "Default~iphone.png", width: 320, height: 480 }           // iPhone
            ]
        });
    }

    //ok
    if (settings.PLATFORMS.indexOf('android') !== -1) {
        platforms.push({
            name: 'android',
            isAdded: true,
            splashPath: 'resources/android/splash/',
            splash: [
                { name: "drawable-land-hdpi-screen.png", width: 640, height: 480, density: "land-hdpi" }, // 480x320
                { name: "drawable-land-ldpi-screen.png", width: 426, height: 320, density: "land-ldpi" }, // 320x200
                { name: "drawable-land-mdpi-screen.png", width: 470, height: 320, density: "land-mdpi" }, // 800x480
                { name: "drawable-land-xhdpi-screen.png", width: 960, height: 720, density: "land-xhdpi" }, // 1280x720
                { name: "drawable-land-xxhdpi-screen.png", width: 1600, height: 960, density: "land-xxhdpi" }, // 1600x960
                { name: "drawable-land-xxxhdpi-screen.png", width: 1920, height: 1280, density: "land-xxhdpi" }, // 1920x1280
                { name: "drawable-port-hdpi-screen.png", width: 480, height: 640, density: "port-hdpi" }, // 320x480
                { name: "drawable-port-ldpi-screen.png", width: 320, height: 426, density: "port-ldpi" }, // 200x320
                { name: "drawable-port-mdpi-screen.png", width: 320, height: 470, density: "port-mdpi" }, // 480x800
                { name: "drawable-port-xhdpi-screen.png", width: 720, height: 960, density: "port-xhdpi" }, // 720x1280
                { name: "drawable-port-xxhdpi-screen.png", width: 960, height: 1600, density: "port-xxhdpi" }, // 960x1600
                { name: "drawable-port-xxxhdpi-screen.png", width: 1280, height: 1920, density: "port-xxhdpi" } // 1280x1920
            ]
        });
    }

    //ok
    // https://msdn.microsoft.com/en-us/library/windows/apps/ff769511(v=vs.105).aspx
    if (settings.PLATFORMS.indexOf('wp8') !== -1) {
        platforms.push({
            name: 'wp8',
            isAdded: true,
            splashPath: 'resources/wp8/splash/',
            splash: [
                { width: 768, height: 1280, name: "SplashScreenImage.jpg" },
                { width: 480, height: 800, name: "SplashScreenImage.screen-WVGA.jpg" },
                { width: 768, height: 1280, name: "SplashScreenImage.screen-WXGA.jpg" },
                { width: 720, height: 1280, name: "SplashScreenImage.screen-720p.jpg" }
            ]
        });
    }

    //ok
    if (settings.PLATFORMS.indexOf('windows') !== -1) {
        platforms.push({
            name: 'windows',
            isAdded: true,
            splashPath: 'resources/windows/splash/',
            splash: [
                { width: 620, height: 300, name: "SplashScreen.scale-100.png" },
                { width: 1152, height: 1920, name: "SplashScreen.scale-240.png" },
                { width: 1152, height: 1920, name: "SplashScreenPhone.scale-240.png" },
            ]
        });
    }

    if (settings.PLATFORMS.indexOf('store') !== -1) {
        platforms.push({
            name: 'store',
            isAdded: true,
            splashPath: 'store/screens/',
            splash: [
                { path: './android/', name: 'cover-store.png', width: 1024, height: 500 },
            ]
        });
    }

    deferred.resolve(platforms);
    return deferred.promise;
};

/**
 * @var {Object} settings - names of the confix file and of the icon image
 * TODO: add option to get these values as CLI params
 */
var settings = {};
settings.ICON_FILE = path.join('resources', 'icon.png');
settings.SPLASH_FILE = path.join('resources', 'splash.png');
settings.PLATFORMS = ['ios', 'android'];

/**
 * @var {Object} console utils
 */
var display = {};
display.success = function (str) {
    str = '✓  '.green + str;
    console.log('  ' + str);
};
display.error = function (str) {
    str = '✗  '.red + str;
    console.log('  ' + str);
};
display.header = function (str) {
    console.log('');
    console.log(' ' + str.cyan.underline);
    console.log('');
};

/**
 * Resizes and creates a new icon in the platform's folder.
 *
 * @param  {Object} platform
 * @param  {Object} icon
 * @return {Promise}
 */
var generateIcon = function (platform, icon) {
    var deferred = Q.defer();
    try {
        var filePath = path.join(platform.iconsPath, icon.name);
        var filedirName = path.dirname(filePath);
        if (!fs.existsSync(filedirName)) {
            nodeFs.mkdirSync(filedirName, '0777', true);
        }
        var srcPath = settings.ICON_FILE;
        var platformIconPath = path.join(path.dirname(srcPath), platform.name, path.basename(srcPath));
        if (fs.existsSync(platformIconPath)) {
            srcPath = platformIconPath;
        }
        ig.resize({
            srcPath: srcPath,
            dstPath: filePath,
            quality: 1,
            format: icon.name.replace(/.*\.(\w+)$/i, '$1').toLowerCase(),
            width: icon.size,
            height: icon.size,
        }, function (err, stdout, stderr) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve();
                display.success(icon.name + ' created');
            }
        });
    } catch (error) {
        deferred.reject(err);
    }
    return deferred.promise;
};

/**
 * Generates icons based on the platform object
 *
 * @param  {Object} platform
 * @return {Promise}
 */
var generateIconsForPlatform = function (platform) {
    var deferred = Q.defer();
    display.header('Generating Icons for ' + platform.name);
    var all = [];
    var icons = platform.icons;
    icons.forEach(function (icon) {
        all.push(generateIcon(platform, icon));
    });
    Q.all(all).then(function () {
        deferred.resolve();
    }).catch(function (err) {
        console.log(err);
    });
    return deferred.promise;
};

/**
 * Goes over all the platforms and triggers icon generation
 *
 * @param  {Array} platforms
 * @return {Promise}
 */
var generateIcons = function (platforms) {
    var deferred = Q.defer();
    var sequence = Q();
    var all = [];
    _(platforms).where({
        isAdded: true
    }).forEach(function (platform) {
        sequence = sequence.then(function () {
            return generateIconsForPlatform(platform);
        });
        all.push(sequence);
    });
    Q.all(all).then(function () {
        deferred.resolve();
    });
    return deferred.promise;
};


/**
 * Checks if a valid icon file exists
 *
 * @return {Promise} resolves if exists, rejects otherwise
 */
var validIconExists = function () {
    var deferred = Q.defer();
    fs.exists(settings.ICON_FILE, function (exists) {
        if (exists) {
            display.success(settings.ICON_FILE + ' exists');
            deferred.resolve(true);
        } else {
            display.error(settings.ICON_FILE + ' does not exist in the root folder');
            deferred.resolve(false);
        }
    });
    return deferred.promise;
};


/**
 * Crops and creates a new splash in the platform's folder.
 *
 * @param  {Object} platform
 * @param  {Object} splash
 * @return {Promise}
 */
var generateSplash = function (platform, splash) {
    var deferred = Q.defer();
    try {
        var filePath = path.join(platform.splashPath, splash.name);
        var filedirName = path.dirname(filePath);
        if (!fs.existsSync(filedirName)) {
            nodeFs.mkdirSync(filedirName, '0777', true);
        }
        var srcPath = settings.SPLASH_FILE;
        var platformIconPath = path.join(path.dirname(srcPath), platform.name, path.basename(srcPath));
        if (fs.existsSync(platformIconPath)) {
            srcPath = platformIconPath;
        }
        ig.crop({
            srcPath: srcPath,
            dstPath: filePath,
            quality: 1,
            format: splash.name.replace(/.*\.(\w+)$/i, '$1').toLowerCase(),
            width: splash.width,
            height: splash.height,
        }, function (err, stdout, stderr) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve();
                display.success(splash.name + ' created');
            }
        });
    } catch (error) {
        deferred.reject(err);
    }
    return deferred.promise;
};

/**
 * Generates splash based on the platform object
 *
 * @param  {Object} platform
 * @return {Promise}
 */
var generateSplashForPlatform = function (platform) {
    var deferred = Q.defer();
    display.header('Generating splash screen for ' + platform.name);
    var all = [];
    var splashes = platform.splash;
    splashes.forEach(function (splash) {
        all.push(generateSplash(platform, splash));
    });
    Q.all(all).then(function () {
        deferred.resolve();
    }).catch(function (err) {
        console.log(err);
    });
    return deferred.promise;
};

/**
 * Goes over all the platforms and triggers splash screen generation
 *
 * @param  {Array} platforms
 * @return {Promise}
 */
var generateSplashes = function (platforms) {
    var deferred = Q.defer();
    var sequence = Q();
    var all = [];
    _(platforms).where({
        isAdded: true
    }).forEach(function (platform) {
        sequence = sequence.then(function () {
            return generateSplashForPlatform(platform);
        });
        all.push(sequence);
    });
    Q.all(all).then(function () {
        deferred.resolve();
    });
    return deferred.promise;
};
/**
 * Checks if a valid splash file exists
 *
 * @return {Promise} resolves if exists, rejects otherwise
 */
var validSplashExists = function () {
    var deferred = Q.defer();
    fs.exists(settings.SPLASH_FILE, function (exists) {
        if (exists) {
            display.success(settings.SPLASH_FILE + ' exists');
            deferred.resolve(true);
        } else {
            display.error(settings.SPLASH_FILE + ' does not exist in the root folder');
            deferred.resolve(false);
        }
    });
    return deferred.promise;
};


function generate(options) {
    settings = options || settings;
    display.header('Checking Splash & Icon');
    return Q.all([validIconExists(), validSplashExists()])
        .then(function (results) {
            var hasIcon = results[0] === true;
            var hasSplash = results[1] === true;
            var promise;

            if (!hasIcon && !hasSplash) {
                //console.log(arguments);
                promise = Q.reject();
            }

            if (hasIcon) {
                promise = Q.when(promise)
                    .then(getPlatformIcons)
                    .then(generateIcons);
            }

            if (hasSplash) {
                promise = Q.when(promise)
                    .then(getPlatformSplashs)
                    .then(generateSplashes);
            }

            return Q.when(promise);
        })
        .catch(function (err) {
            if (err) {
                console.log(err);
            }
        }).then(function () {
            console.log('');
        });
}

module.exports = {
    generate: generate
};
