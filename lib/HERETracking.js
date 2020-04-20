(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("HERETracking", [], factory);
	else if(typeof exports === 'object')
		exports["HERETracking"] = factory();
	else
		root["HERETracking"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/crypto-js/aes.js":
/*!****************************************!*\
  !*** ../node_modules/crypto-js/aes.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./enc-base64 */ "../node_modules/crypto-js/enc-base64.js"), __webpack_require__(/*! ./md5 */ "../node_modules/crypto-js/md5.js"), __webpack_require__(/*! ./evpkdf */ "../node_modules/crypto-js/evpkdf.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Lookup tables
	    var SBOX = [];
	    var INV_SBOX = [];
	    var SUB_MIX_0 = [];
	    var SUB_MIX_1 = [];
	    var SUB_MIX_2 = [];
	    var SUB_MIX_3 = [];
	    var INV_SUB_MIX_0 = [];
	    var INV_SUB_MIX_1 = [];
	    var INV_SUB_MIX_2 = [];
	    var INV_SUB_MIX_3 = [];

	    // Compute lookup tables
	    (function () {
	        // Compute double table
	        var d = [];
	        for (var i = 0; i < 256; i++) {
	            if (i < 128) {
	                d[i] = i << 1;
	            } else {
	                d[i] = (i << 1) ^ 0x11b;
	            }
	        }

	        // Walk GF(2^8)
	        var x = 0;
	        var xi = 0;
	        for (var i = 0; i < 256; i++) {
	            // Compute sbox
	            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	            SBOX[x] = sx;
	            INV_SBOX[sx] = x;

	            // Compute multiplication
	            var x2 = d[x];
	            var x4 = d[x2];
	            var x8 = d[x4];

	            // Compute sub bytes, mix columns tables
	            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
	            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
	            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
	            SUB_MIX_3[x] = t;

	            // Compute inv sub bytes, inv mix columns tables
	            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
	            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
	            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
	            INV_SUB_MIX_3[sx] = t;

	            // Compute next counter
	            if (!x) {
	                x = xi = 1;
	            } else {
	                x = x2 ^ d[d[d[x8 ^ x2]]];
	                xi ^= d[d[xi]];
	            }
	        }
	    }());

	    // Precomputed Rcon lookup
	    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

	    /**
	     * AES block cipher algorithm.
	     */
	    var AES = C_algo.AES = BlockCipher.extend({
	        _doReset: function () {
	            // Skip reset of nRounds has been set before and key did not change
	            if (this._nRounds && this._keyPriorReset === this._key) {
	                return;
	            }

	            // Shortcuts
	            var key = this._keyPriorReset = this._key;
	            var keyWords = key.words;
	            var keySize = key.sigBytes / 4;

	            // Compute number of rounds
	            var nRounds = this._nRounds = keySize + 6;

	            // Compute number of key schedule rows
	            var ksRows = (nRounds + 1) * 4;

	            // Compute key schedule
	            var keySchedule = this._keySchedule = [];
	            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
	                if (ksRow < keySize) {
	                    keySchedule[ksRow] = keyWords[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 1];

	                    if (!(ksRow % keySize)) {
	                        // Rot word
	                        t = (t << 8) | (t >>> 24);

	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

	                        // Mix Rcon
	                        t ^= RCON[(ksRow / keySize) | 0] << 24;
	                    } else if (keySize > 6 && ksRow % keySize == 4) {
	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
	                    }

	                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
	                }
	            }

	            // Compute inv key schedule
	            var invKeySchedule = this._invKeySchedule = [];
	            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
	                var ksRow = ksRows - invKsRow;

	                if (invKsRow % 4) {
	                    var t = keySchedule[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 4];
	                }

	                if (invKsRow < 4 || ksRow <= 4) {
	                    invKeySchedule[invKsRow] = t;
	                } else {
	                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
	                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
	                }
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
	        },

	        decryptBlock: function (M, offset) {
	            // Swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;

	            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

	            // Inv swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;
	        },

	        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
	            // Shortcut
	            var nRounds = this._nRounds;

	            // Get input, add round key
	            var s0 = M[offset]     ^ keySchedule[0];
	            var s1 = M[offset + 1] ^ keySchedule[1];
	            var s2 = M[offset + 2] ^ keySchedule[2];
	            var s3 = M[offset + 3] ^ keySchedule[3];

	            // Key schedule row counter
	            var ksRow = 4;

	            // Rounds
	            for (var round = 1; round < nRounds; round++) {
	                // Shift rows, sub bytes, mix columns, add round key
	                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
	                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
	                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
	                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

	                // Update state
	                s0 = t0;
	                s1 = t1;
	                s2 = t2;
	                s3 = t3;
	            }

	            // Shift rows, sub bytes, add round key
	            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

	            // Set output
	            M[offset]     = t0;
	            M[offset + 1] = t1;
	            M[offset + 2] = t2;
	            M[offset + 3] = t3;
	        },

	        keySize: 256/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
	     */
	    C.AES = BlockCipher._createHelper(AES);
	}());


	return CryptoJS.AES;

}));

/***/ }),

/***/ "../node_modules/crypto-js/cipher-core.js":
/*!************************************************!*\
  !*** ../node_modules/crypto-js/cipher-core.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./evpkdf */ "../node_modules/crypto-js/evpkdf.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * Cipher core components.
	 */
	CryptoJS.lib.Cipher || (function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var Base64 = C_enc.Base64;
	    var C_algo = C.algo;
	    var EvpKDF = C_algo.EvpKDF;

	    /**
	     * Abstract base cipher template.
	     *
	     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
	     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
	     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
	     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
	     */
	    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {WordArray} iv The IV to use for this operation.
	         */
	        cfg: Base.extend(),

	        /**
	         * Creates this cipher in encryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createEncryptor: function (key, cfg) {
	            return this.create(this._ENC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Creates this cipher in decryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createDecryptor: function (key, cfg) {
	            return this.create(this._DEC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Initializes a newly created cipher.
	         *
	         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
	         */
	        init: function (xformMode, key, cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Store transform mode and key
	            this._xformMode = xformMode;
	            this._key = key;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this cipher to its initial state.
	         *
	         * @example
	         *
	         *     cipher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-cipher logic
	            this._doReset();
	        },

	        /**
	         * Adds data to be encrypted or decrypted.
	         *
	         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.process('data');
	         *     var encrypted = cipher.process(wordArray);
	         */
	        process: function (dataUpdate) {
	            // Append
	            this._append(dataUpdate);

	            // Process available blocks
	            return this._process();
	        },

	        /**
	         * Finalizes the encryption or decryption process.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after final processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.finalize();
	         *     var encrypted = cipher.finalize('data');
	         *     var encrypted = cipher.finalize(wordArray);
	         */
	        finalize: function (dataUpdate) {
	            // Final data update
	            if (dataUpdate) {
	                this._append(dataUpdate);
	            }

	            // Perform concrete-cipher logic
	            var finalProcessedData = this._doFinalize();

	            return finalProcessedData;
	        },

	        keySize: 128/32,

	        ivSize: 128/32,

	        _ENC_XFORM_MODE: 1,

	        _DEC_XFORM_MODE: 2,

	        /**
	         * Creates shortcut functions to a cipher's object interface.
	         *
	         * @param {Cipher} cipher The cipher to create a helper for.
	         *
	         * @return {Object} An object with encrypt and decrypt shortcut functions.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
	         */
	        _createHelper: (function () {
	            function selectCipherStrategy(key) {
	                if (typeof key == 'string') {
	                    return PasswordBasedCipher;
	                } else {
	                    return SerializableCipher;
	                }
	            }

	            return function (cipher) {
	                return {
	                    encrypt: function (message, key, cfg) {
	                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
	                    },

	                    decrypt: function (ciphertext, key, cfg) {
	                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
	                    }
	                };
	            };
	        }())
	    });

	    /**
	     * Abstract base stream cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
	     */
	    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
	        _doFinalize: function () {
	            // Process partial blocks
	            var finalProcessedBlocks = this._process(!!'flush');

	            return finalProcessedBlocks;
	        },

	        blockSize: 1
	    });

	    /**
	     * Mode namespace.
	     */
	    var C_mode = C.mode = {};

	    /**
	     * Abstract base block cipher mode template.
	     */
	    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
	        /**
	         * Creates this mode for encryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
	         */
	        createEncryptor: function (cipher, iv) {
	            return this.Encryptor.create(cipher, iv);
	        },

	        /**
	         * Creates this mode for decryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
	         */
	        createDecryptor: function (cipher, iv) {
	            return this.Decryptor.create(cipher, iv);
	        },

	        /**
	         * Initializes a newly created mode.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
	         */
	        init: function (cipher, iv) {
	            this._cipher = cipher;
	            this._iv = iv;
	        }
	    });

	    /**
	     * Cipher Block Chaining mode.
	     */
	    var CBC = C_mode.CBC = (function () {
	        /**
	         * Abstract base CBC mode.
	         */
	        var CBC = BlockCipherMode.extend();

	        /**
	         * CBC encryptor.
	         */
	        CBC.Encryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // XOR and encrypt
	                xorBlock.call(this, words, offset, blockSize);
	                cipher.encryptBlock(words, offset);

	                // Remember this block to use with next block
	                this._prevBlock = words.slice(offset, offset + blockSize);
	            }
	        });

	        /**
	         * CBC decryptor.
	         */
	        CBC.Decryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // Remember this block to use with next block
	                var thisBlock = words.slice(offset, offset + blockSize);

	                // Decrypt and XOR
	                cipher.decryptBlock(words, offset);
	                xorBlock.call(this, words, offset, blockSize);

	                // This block becomes the previous block
	                this._prevBlock = thisBlock;
	            }
	        });

	        function xorBlock(words, offset, blockSize) {
	            // Shortcut
	            var iv = this._iv;

	            // Choose mixing block
	            if (iv) {
	                var block = iv;

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            } else {
	                var block = this._prevBlock;
	            }

	            // XOR blocks
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= block[i];
	            }
	        }

	        return CBC;
	    }());

	    /**
	     * Padding namespace.
	     */
	    var C_pad = C.pad = {};

	    /**
	     * PKCS #5/7 padding strategy.
	     */
	    var Pkcs7 = C_pad.Pkcs7 = {
	        /**
	         * Pads data using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to pad.
	         * @param {number} blockSize The multiple that the data should be padded to.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
	         */
	        pad: function (data, blockSize) {
	            // Shortcut
	            var blockSizeBytes = blockSize * 4;

	            // Count padding bytes
	            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	            // Create padding word
	            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

	            // Create padding
	            var paddingWords = [];
	            for (var i = 0; i < nPaddingBytes; i += 4) {
	                paddingWords.push(paddingWord);
	            }
	            var padding = WordArray.create(paddingWords, nPaddingBytes);

	            // Add padding
	            data.concat(padding);
	        },

	        /**
	         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to unpad.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
	         */
	        unpad: function (data) {
	            // Get number of padding bytes from last byte
	            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	            // Remove padding
	            data.sigBytes -= nPaddingBytes;
	        }
	    };

	    /**
	     * Abstract base block cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
	     */
	    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Mode} mode The block mode to use. Default: CBC
	         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
	         */
	        cfg: Cipher.cfg.extend({
	            mode: CBC,
	            padding: Pkcs7
	        }),

	        reset: function () {
	            // Reset cipher
	            Cipher.reset.call(this);

	            // Shortcuts
	            var cfg = this.cfg;
	            var iv = cfg.iv;
	            var mode = cfg.mode;

	            // Reset block mode
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                var modeCreator = mode.createEncryptor;
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                var modeCreator = mode.createDecryptor;
	                // Keep at least one block in the buffer for unpadding
	                this._minBufferSize = 1;
	            }

	            if (this._mode && this._mode.__creator == modeCreator) {
	                this._mode.init(this, iv && iv.words);
	            } else {
	                this._mode = modeCreator.call(mode, this, iv && iv.words);
	                this._mode.__creator = modeCreator;
	            }
	        },

	        _doProcessBlock: function (words, offset) {
	            this._mode.processBlock(words, offset);
	        },

	        _doFinalize: function () {
	            // Shortcut
	            var padding = this.cfg.padding;

	            // Finalize
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                // Pad data
	                padding.pad(this._data, this.blockSize);

	                // Process final blocks
	                var finalProcessedBlocks = this._process(!!'flush');
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                // Process final blocks
	                var finalProcessedBlocks = this._process(!!'flush');

	                // Unpad data
	                padding.unpad(finalProcessedBlocks);
	            }

	            return finalProcessedBlocks;
	        },

	        blockSize: 128/32
	    });

	    /**
	     * A collection of cipher parameters.
	     *
	     * @property {WordArray} ciphertext The raw ciphertext.
	     * @property {WordArray} key The key to this ciphertext.
	     * @property {WordArray} iv The IV used in the ciphering operation.
	     * @property {WordArray} salt The salt used with a key derivation function.
	     * @property {Cipher} algorithm The cipher algorithm.
	     * @property {Mode} mode The block mode used in the ciphering operation.
	     * @property {Padding} padding The padding scheme used in the ciphering operation.
	     * @property {number} blockSize The block size of the cipher.
	     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
	     */
	    var CipherParams = C_lib.CipherParams = Base.extend({
	        /**
	         * Initializes a newly created cipher params object.
	         *
	         * @param {Object} cipherParams An object with any of the possible cipher parameters.
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.lib.CipherParams.create({
	         *         ciphertext: ciphertextWordArray,
	         *         key: keyWordArray,
	         *         iv: ivWordArray,
	         *         salt: saltWordArray,
	         *         algorithm: CryptoJS.algo.AES,
	         *         mode: CryptoJS.mode.CBC,
	         *         padding: CryptoJS.pad.PKCS7,
	         *         blockSize: 4,
	         *         formatter: CryptoJS.format.OpenSSL
	         *     });
	         */
	        init: function (cipherParams) {
	            this.mixIn(cipherParams);
	        },

	        /**
	         * Converts this cipher params object to a string.
	         *
	         * @param {Format} formatter (Optional) The formatting strategy to use.
	         *
	         * @return {string} The stringified cipher params.
	         *
	         * @throws Error If neither the formatter nor the default formatter is set.
	         *
	         * @example
	         *
	         *     var string = cipherParams + '';
	         *     var string = cipherParams.toString();
	         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
	         */
	        toString: function (formatter) {
	            return (formatter || this.formatter).stringify(this);
	        }
	    });

	    /**
	     * Format namespace.
	     */
	    var C_format = C.format = {};

	    /**
	     * OpenSSL formatting strategy.
	     */
	    var OpenSSLFormatter = C_format.OpenSSL = {
	        /**
	         * Converts a cipher params object to an OpenSSL-compatible string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The OpenSSL-compatible string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            // Shortcuts
	            var ciphertext = cipherParams.ciphertext;
	            var salt = cipherParams.salt;

	            // Format
	            if (salt) {
	                var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
	            } else {
	                var wordArray = ciphertext;
	            }

	            return wordArray.toString(Base64);
	        },

	        /**
	         * Converts an OpenSSL-compatible string to a cipher params object.
	         *
	         * @param {string} openSSLStr The OpenSSL-compatible string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
	         */
	        parse: function (openSSLStr) {
	            // Parse base64
	            var ciphertext = Base64.parse(openSSLStr);

	            // Shortcut
	            var ciphertextWords = ciphertext.words;

	            // Test for salt
	            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
	                // Extract salt
	                var salt = WordArray.create(ciphertextWords.slice(2, 4));

	                // Remove salt from ciphertext
	                ciphertextWords.splice(0, 4);
	                ciphertext.sigBytes -= 16;
	            }

	            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
	        }
	    };

	    /**
	     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
	     */
	    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
	         */
	        cfg: Base.extend({
	            format: OpenSSLFormatter
	        }),

	        /**
	         * Encrypts a message.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Encrypt
	            var encryptor = cipher.createEncryptor(key, cfg);
	            var ciphertext = encryptor.finalize(message);

	            // Shortcut
	            var cipherCfg = encryptor.cfg;

	            // Create and return serializable cipher params
	            return CipherParams.create({
	                ciphertext: ciphertext,
	                key: key,
	                iv: cipherCfg.iv,
	                algorithm: cipher,
	                mode: cipherCfg.mode,
	                padding: cipherCfg.padding,
	                blockSize: cipher.blockSize,
	                formatter: cfg.format
	            });
	        },

	        /**
	         * Decrypts serialized ciphertext.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Decrypt
	            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

	            return plaintext;
	        },

	        /**
	         * Converts serialized ciphertext to CipherParams,
	         * else assumed CipherParams already and returns ciphertext unchanged.
	         *
	         * @param {CipherParams|string} ciphertext The ciphertext.
	         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
	         *
	         * @return {CipherParams} The unserialized ciphertext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
	         */
	        _parse: function (ciphertext, format) {
	            if (typeof ciphertext == 'string') {
	                return format.parse(ciphertext, this);
	            } else {
	                return ciphertext;
	            }
	        }
	    });

	    /**
	     * Key derivation function namespace.
	     */
	    var C_kdf = C.kdf = {};

	    /**
	     * OpenSSL key derivation function.
	     */
	    var OpenSSLKdf = C_kdf.OpenSSL = {
	        /**
	         * Derives a key and IV from a password.
	         *
	         * @param {string} password The password to derive from.
	         * @param {number} keySize The size in words of the key to generate.
	         * @param {number} ivSize The size in words of the IV to generate.
	         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
	         *
	         * @return {CipherParams} A cipher params object with the key, IV, and salt.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
	         */
	        execute: function (password, keySize, ivSize, salt) {
	            // Generate random salt
	            if (!salt) {
	                salt = WordArray.random(64/8);
	            }

	            // Derive key and IV
	            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

	            // Separate key and IV
	            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
	            key.sigBytes = keySize * 4;

	            // Return params
	            return CipherParams.create({ key: key, iv: iv, salt: salt });
	        }
	    };

	    /**
	     * A serializable cipher wrapper that derives the key from a password,
	     * and returns ciphertext as a serializable cipher params object.
	     */
	    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
	         */
	        cfg: SerializableCipher.cfg.extend({
	            kdf: OpenSSLKdf
	        }),

	        /**
	         * Encrypts a message using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Encrypt
	            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

	            // Mix in derived params
	            ciphertext.mixIn(derivedParams);

	            return ciphertext;
	        },

	        /**
	         * Decrypts serialized ciphertext using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Decrypt
	            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

	            return plaintext;
	        }
	    });
	}());


}));

/***/ }),

/***/ "../node_modules/crypto-js/core.js":
/*!*****************************************!*\
  !*** ../node_modules/crypto-js/core.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else {}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {};

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),

/***/ "../node_modules/crypto-js/enc-base64.js":
/*!***********************************************!*\
  !*** ../node_modules/crypto-js/enc-base64.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());


	return CryptoJS.enc.Base64;

}));

/***/ }),

/***/ "../node_modules/crypto-js/enc-utf16.js":
/*!**********************************************!*\
  !*** ../node_modules/crypto-js/enc-utf16.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * UTF-16 BE encoding strategy.
	     */
	    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
	        /**
	         * Converts a word array to a UTF-16 BE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 BE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }

	            return utf16Chars.join('');
	        },

	        /**
	         * Converts a UTF-16 BE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 BE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
	         */
	        parse: function (utf16Str) {
	            // Shortcut
	            var utf16StrLength = utf16Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
	            }

	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };

	    /**
	     * UTF-16 LE encoding strategy.
	     */
	    C_enc.Utf16LE = {
	        /**
	         * Converts a word array to a UTF-16 LE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 LE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }

	            return utf16Chars.join('');
	        },

	        /**
	         * Converts a UTF-16 LE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 LE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
	         */
	        parse: function (utf16Str) {
	            // Shortcut
	            var utf16StrLength = utf16Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
	            }

	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };

	    function swapEndian(word) {
	        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
	    }
	}());


	return CryptoJS.enc.Utf16;

}));

/***/ }),

/***/ "../node_modules/crypto-js/evpkdf.js":
/*!*******************************************!*\
  !*** ../node_modules/crypto-js/evpkdf.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./sha1 */ "../node_modules/crypto-js/sha1.js"), __webpack_require__(/*! ./hmac */ "../node_modules/crypto-js/hmac.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var MD5 = C_algo.MD5;

	    /**
	     * This key derivation function is meant to conform with EVP_BytesToKey.
	     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
	     */
	    var EvpKDF = C_algo.EvpKDF = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: MD5,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.EvpKDF.create();
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Derives a key from a password.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            // Shortcut
	            var cfg = this.cfg;

	            // Init hasher
	            var hasher = cfg.hasher.create();

	            // Initial values
	            var derivedKey = WordArray.create();

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                if (block) {
	                    hasher.update(block);
	                }
	                var block = hasher.update(password).finalize(salt);
	                hasher.reset();

	                // Iterations
	                for (var i = 1; i < iterations; i++) {
	                    block = hasher.finalize(block);
	                    hasher.reset();
	                }

	                derivedKey.concat(block);
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Derives a key from a password.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.EvpKDF(password, salt);
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.EvpKDF = function (password, salt, cfg) {
	        return EvpKDF.create(cfg).compute(password, salt);
	    };
	}());


	return CryptoJS.EvpKDF;

}));

/***/ }),

/***/ "../node_modules/crypto-js/format-hex.js":
/*!***********************************************!*\
  !*** ../node_modules/crypto-js/format-hex.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var CipherParams = C_lib.CipherParams;
	    var C_enc = C.enc;
	    var Hex = C_enc.Hex;
	    var C_format = C.format;

	    var HexFormatter = C_format.Hex = {
	        /**
	         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The hexadecimally encoded string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            return cipherParams.ciphertext.toString(Hex);
	        },

	        /**
	         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
	         *
	         * @param {string} input The hexadecimally encoded string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
	         */
	        parse: function (input) {
	            var ciphertext = Hex.parse(input);
	            return CipherParams.create({ ciphertext: ciphertext });
	        }
	    };
	}());


	return CryptoJS.format.Hex;

}));

/***/ }),

/***/ "../node_modules/crypto-js/hmac.js":
/*!*****************************************!*\
  !*** ../node_modules/crypto-js/hmac.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


}));

/***/ }),

/***/ "../node_modules/crypto-js/index.js":
/*!******************************************!*\
  !*** ../node_modules/crypto-js/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./x64-core */ "../node_modules/crypto-js/x64-core.js"), __webpack_require__(/*! ./lib-typedarrays */ "../node_modules/crypto-js/lib-typedarrays.js"), __webpack_require__(/*! ./enc-utf16 */ "../node_modules/crypto-js/enc-utf16.js"), __webpack_require__(/*! ./enc-base64 */ "../node_modules/crypto-js/enc-base64.js"), __webpack_require__(/*! ./md5 */ "../node_modules/crypto-js/md5.js"), __webpack_require__(/*! ./sha1 */ "../node_modules/crypto-js/sha1.js"), __webpack_require__(/*! ./sha256 */ "../node_modules/crypto-js/sha256.js"), __webpack_require__(/*! ./sha224 */ "../node_modules/crypto-js/sha224.js"), __webpack_require__(/*! ./sha512 */ "../node_modules/crypto-js/sha512.js"), __webpack_require__(/*! ./sha384 */ "../node_modules/crypto-js/sha384.js"), __webpack_require__(/*! ./sha3 */ "../node_modules/crypto-js/sha3.js"), __webpack_require__(/*! ./ripemd160 */ "../node_modules/crypto-js/ripemd160.js"), __webpack_require__(/*! ./hmac */ "../node_modules/crypto-js/hmac.js"), __webpack_require__(/*! ./pbkdf2 */ "../node_modules/crypto-js/pbkdf2.js"), __webpack_require__(/*! ./evpkdf */ "../node_modules/crypto-js/evpkdf.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"), __webpack_require__(/*! ./mode-cfb */ "../node_modules/crypto-js/mode-cfb.js"), __webpack_require__(/*! ./mode-ctr */ "../node_modules/crypto-js/mode-ctr.js"), __webpack_require__(/*! ./mode-ctr-gladman */ "../node_modules/crypto-js/mode-ctr-gladman.js"), __webpack_require__(/*! ./mode-ofb */ "../node_modules/crypto-js/mode-ofb.js"), __webpack_require__(/*! ./mode-ecb */ "../node_modules/crypto-js/mode-ecb.js"), __webpack_require__(/*! ./pad-ansix923 */ "../node_modules/crypto-js/pad-ansix923.js"), __webpack_require__(/*! ./pad-iso10126 */ "../node_modules/crypto-js/pad-iso10126.js"), __webpack_require__(/*! ./pad-iso97971 */ "../node_modules/crypto-js/pad-iso97971.js"), __webpack_require__(/*! ./pad-zeropadding */ "../node_modules/crypto-js/pad-zeropadding.js"), __webpack_require__(/*! ./pad-nopadding */ "../node_modules/crypto-js/pad-nopadding.js"), __webpack_require__(/*! ./format-hex */ "../node_modules/crypto-js/format-hex.js"), __webpack_require__(/*! ./aes */ "../node_modules/crypto-js/aes.js"), __webpack_require__(/*! ./tripledes */ "../node_modules/crypto-js/tripledes.js"), __webpack_require__(/*! ./rc4 */ "../node_modules/crypto-js/rc4.js"), __webpack_require__(/*! ./rabbit */ "../node_modules/crypto-js/rabbit.js"), __webpack_require__(/*! ./rabbit-legacy */ "../node_modules/crypto-js/rabbit-legacy.js"));
	}
	else {}
}(this, function (CryptoJS) {

	return CryptoJS;

}));

/***/ }),

/***/ "../node_modules/crypto-js/lib-typedarrays.js":
/*!****************************************************!*\
  !*** ../node_modules/crypto-js/lib-typedarrays.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Check if typed arrays are supported
	    if (typeof ArrayBuffer != 'function') {
	        return;
	    }

	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;

	    // Reference original init
	    var superInit = WordArray.init;

	    // Augment WordArray.init to handle typed arrays
	    var subInit = WordArray.init = function (typedArray) {
	        // Convert buffers to uint8
	        if (typedArray instanceof ArrayBuffer) {
	            typedArray = new Uint8Array(typedArray);
	        }

	        // Convert other array views to uint8
	        if (
	            typedArray instanceof Int8Array ||
	            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
	            typedArray instanceof Int16Array ||
	            typedArray instanceof Uint16Array ||
	            typedArray instanceof Int32Array ||
	            typedArray instanceof Uint32Array ||
	            typedArray instanceof Float32Array ||
	            typedArray instanceof Float64Array
	        ) {
	            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
	        }

	        // Handle Uint8Array
	        if (typedArray instanceof Uint8Array) {
	            // Shortcut
	            var typedArrayByteLength = typedArray.byteLength;

	            // Extract bytes
	            var words = [];
	            for (var i = 0; i < typedArrayByteLength; i++) {
	                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
	            }

	            // Initialize this word array
	            superInit.call(this, words, typedArrayByteLength);
	        } else {
	            // Else call normal init
	            superInit.apply(this, arguments);
	        }
	    };

	    subInit.prototype = WordArray;
	}());


	return CryptoJS.lib.WordArray;

}));

/***/ }),

/***/ "../node_modules/crypto-js/md5.js":
/*!****************************************!*\
  !*** ../node_modules/crypto-js/md5.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working varialbes
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	return CryptoJS.MD5;

}));

/***/ }),

/***/ "../node_modules/crypto-js/mode-cfb.js":
/*!*********************************************!*\
  !*** ../node_modules/crypto-js/mode-cfb.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * Cipher Feedback block mode.
	 */
	CryptoJS.mode.CFB = (function () {
	    var CFB = CryptoJS.lib.BlockCipherMode.extend();

	    CFB.Encryptor = CFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher;
	            var blockSize = cipher.blockSize;

	            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

	            // Remember this block to use with next block
	            this._prevBlock = words.slice(offset, offset + blockSize);
	        }
	    });

	    CFB.Decryptor = CFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher;
	            var blockSize = cipher.blockSize;

	            // Remember this block to use with next block
	            var thisBlock = words.slice(offset, offset + blockSize);

	            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

	            // This block becomes the previous block
	            this._prevBlock = thisBlock;
	        }
	    });

	    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
	        // Shortcut
	        var iv = this._iv;

	        // Generate keystream
	        if (iv) {
	            var keystream = iv.slice(0);

	            // Remove IV for subsequent blocks
	            this._iv = undefined;
	        } else {
	            var keystream = this._prevBlock;
	        }
	        cipher.encryptBlock(keystream, 0);

	        // Encrypt
	        for (var i = 0; i < blockSize; i++) {
	            words[offset + i] ^= keystream[i];
	        }
	    }

	    return CFB;
	}());


	return CryptoJS.mode.CFB;

}));

/***/ }),

/***/ "../node_modules/crypto-js/mode-ctr-gladman.js":
/*!*****************************************************!*\
  !*** ../node_modules/crypto-js/mode-ctr-gladman.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/** @preserve
	 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
	 * derived from CryptoJS.mode.CTR
	 * Jan Hruby jhruby.web@gmail.com
	 */
	CryptoJS.mode.CTRGladman = (function () {
	    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

		function incWord(word)
		{
			if (((word >> 24) & 0xff) === 0xff) { //overflow
			var b1 = (word >> 16)&0xff;
			var b2 = (word >> 8)&0xff;
			var b3 = word & 0xff;

			if (b1 === 0xff) // overflow b1
			{
			b1 = 0;
			if (b2 === 0xff)
			{
				b2 = 0;
				if (b3 === 0xff)
				{
					b3 = 0;
				}
				else
				{
					++b3;
				}
			}
			else
			{
				++b2;
			}
			}
			else
			{
			++b1;
			}

			word = 0;
			word += (b1 << 16);
			word += (b2 << 8);
			word += b3;
			}
			else
			{
			word += (0x01 << 24);
			}
			return word;
		}

		function incCounter(counter)
		{
			if ((counter[0] = incWord(counter[0])) === 0)
			{
				// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
				counter[1] = incWord(counter[1]);
			}
			return counter;
		}

	    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var counter = this._counter;

	            // Generate keystream
	            if (iv) {
	                counter = this._counter = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }

				incCounter(counter);

				var keystream = counter.slice(0);
	            cipher.encryptBlock(keystream, 0);

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    CTRGladman.Decryptor = Encryptor;

	    return CTRGladman;
	}());




	return CryptoJS.mode.CTRGladman;

}));

/***/ }),

/***/ "../node_modules/crypto-js/mode-ctr.js":
/*!*********************************************!*\
  !*** ../node_modules/crypto-js/mode-ctr.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * Counter block mode.
	 */
	CryptoJS.mode.CTR = (function () {
	    var CTR = CryptoJS.lib.BlockCipherMode.extend();

	    var Encryptor = CTR.Encryptor = CTR.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var counter = this._counter;

	            // Generate keystream
	            if (iv) {
	                counter = this._counter = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }
	            var keystream = counter.slice(0);
	            cipher.encryptBlock(keystream, 0);

	            // Increment counter
	            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    CTR.Decryptor = Encryptor;

	    return CTR;
	}());


	return CryptoJS.mode.CTR;

}));

/***/ }),

/***/ "../node_modules/crypto-js/mode-ecb.js":
/*!*********************************************!*\
  !*** ../node_modules/crypto-js/mode-ecb.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * Electronic Codebook block mode.
	 */
	CryptoJS.mode.ECB = (function () {
	    var ECB = CryptoJS.lib.BlockCipherMode.extend();

	    ECB.Encryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.encryptBlock(words, offset);
	        }
	    });

	    ECB.Decryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.decryptBlock(words, offset);
	        }
	    });

	    return ECB;
	}());


	return CryptoJS.mode.ECB;

}));

/***/ }),

/***/ "../node_modules/crypto-js/mode-ofb.js":
/*!*********************************************!*\
  !*** ../node_modules/crypto-js/mode-ofb.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * Output Feedback block mode.
	 */
	CryptoJS.mode.OFB = (function () {
	    var OFB = CryptoJS.lib.BlockCipherMode.extend();

	    var Encryptor = OFB.Encryptor = OFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var keystream = this._keystream;

	            // Generate keystream
	            if (iv) {
	                keystream = this._keystream = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }
	            cipher.encryptBlock(keystream, 0);

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    OFB.Decryptor = Encryptor;

	    return OFB;
	}());


	return CryptoJS.mode.OFB;

}));

/***/ }),

/***/ "../node_modules/crypto-js/pad-ansix923.js":
/*!*************************************************!*\
  !*** ../node_modules/crypto-js/pad-ansix923.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * ANSI X.923 padding strategy.
	 */
	CryptoJS.pad.AnsiX923 = {
	    pad: function (data, blockSize) {
	        // Shortcuts
	        var dataSigBytes = data.sigBytes;
	        var blockSizeBytes = blockSize * 4;

	        // Count padding bytes
	        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

	        // Compute last byte position
	        var lastBytePos = dataSigBytes + nPaddingBytes - 1;

	        // Pad
	        data.clamp();
	        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
	        data.sigBytes += nPaddingBytes;
	    },

	    unpad: function (data) {
	        // Get number of padding bytes from last byte
	        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	        // Remove padding
	        data.sigBytes -= nPaddingBytes;
	    }
	};


	return CryptoJS.pad.Ansix923;

}));

/***/ }),

/***/ "../node_modules/crypto-js/pad-iso10126.js":
/*!*************************************************!*\
  !*** ../node_modules/crypto-js/pad-iso10126.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * ISO 10126 padding strategy.
	 */
	CryptoJS.pad.Iso10126 = {
	    pad: function (data, blockSize) {
	        // Shortcut
	        var blockSizeBytes = blockSize * 4;

	        // Count padding bytes
	        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	        // Pad
	        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
	             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
	    },

	    unpad: function (data) {
	        // Get number of padding bytes from last byte
	        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	        // Remove padding
	        data.sigBytes -= nPaddingBytes;
	    }
	};


	return CryptoJS.pad.Iso10126;

}));

/***/ }),

/***/ "../node_modules/crypto-js/pad-iso97971.js":
/*!*************************************************!*\
  !*** ../node_modules/crypto-js/pad-iso97971.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * ISO/IEC 9797-1 Padding Method 2.
	 */
	CryptoJS.pad.Iso97971 = {
	    pad: function (data, blockSize) {
	        // Add 0x80 byte
	        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

	        // Zero pad the rest
	        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
	    },

	    unpad: function (data) {
	        // Remove zero padding
	        CryptoJS.pad.ZeroPadding.unpad(data);

	        // Remove one more byte -- the 0x80 byte
	        data.sigBytes--;
	    }
	};


	return CryptoJS.pad.Iso97971;

}));

/***/ }),

/***/ "../node_modules/crypto-js/pad-nopadding.js":
/*!**************************************************!*\
  !*** ../node_modules/crypto-js/pad-nopadding.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * A noop padding strategy.
	 */
	CryptoJS.pad.NoPadding = {
	    pad: function () {
	    },

	    unpad: function () {
	    }
	};


	return CryptoJS.pad.NoPadding;

}));

/***/ }),

/***/ "../node_modules/crypto-js/pad-zeropadding.js":
/*!****************************************************!*\
  !*** ../node_modules/crypto-js/pad-zeropadding.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * Zero padding strategy.
	 */
	CryptoJS.pad.ZeroPadding = {
	    pad: function (data, blockSize) {
	        // Shortcut
	        var blockSizeBytes = blockSize * 4;

	        // Pad
	        data.clamp();
	        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
	    },

	    unpad: function (data) {
	        // Shortcut
	        var dataWords = data.words;

	        // Unpad
	        var i = data.sigBytes - 1;
	        while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
	            i--;
	        }
	        data.sigBytes = i + 1;
	    }
	};


	return CryptoJS.pad.ZeroPadding;

}));

/***/ }),

/***/ "../node_modules/crypto-js/pbkdf2.js":
/*!*******************************************!*\
  !*** ../node_modules/crypto-js/pbkdf2.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./sha1 */ "../node_modules/crypto-js/sha1.js"), __webpack_require__(/*! ./hmac */ "../node_modules/crypto-js/hmac.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA1 = C_algo.SHA1;
	    var HMAC = C_algo.HMAC;

	    /**
	     * Password-Based Key Derivation Function 2 algorithm.
	     */
	    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hasher to use. Default: SHA1
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: SHA1,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.PBKDF2.create();
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Computes the Password-Based Key Derivation Function 2.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            // Shortcut
	            var cfg = this.cfg;

	            // Init HMAC
	            var hmac = HMAC.create(cfg.hasher, password);

	            // Initial values
	            var derivedKey = WordArray.create();
	            var blockIndex = WordArray.create([0x00000001]);

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var blockIndexWords = blockIndex.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                var block = hmac.update(salt).finalize(blockIndex);
	                hmac.reset();

	                // Shortcuts
	                var blockWords = block.words;
	                var blockWordsLength = blockWords.length;

	                // Iterations
	                var intermediate = block;
	                for (var i = 1; i < iterations; i++) {
	                    intermediate = hmac.finalize(intermediate);
	                    hmac.reset();

	                    // Shortcut
	                    var intermediateWords = intermediate.words;

	                    // XOR intermediate with block
	                    for (var j = 0; j < blockWordsLength; j++) {
	                        blockWords[j] ^= intermediateWords[j];
	                    }
	                }

	                derivedKey.concat(block);
	                blockIndexWords[0]++;
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Computes the Password-Based Key Derivation Function 2.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.PBKDF2(password, salt);
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.PBKDF2 = function (password, salt, cfg) {
	        return PBKDF2.create(cfg).compute(password, salt);
	    };
	}());


	return CryptoJS.PBKDF2;

}));

/***/ }),

/***/ "../node_modules/crypto-js/rabbit-legacy.js":
/*!**************************************************!*\
  !*** ../node_modules/crypto-js/rabbit-legacy.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./enc-base64 */ "../node_modules/crypto-js/enc-base64.js"), __webpack_require__(/*! ./md5 */ "../node_modules/crypto-js/md5.js"), __webpack_require__(/*! ./evpkdf */ "../node_modules/crypto-js/evpkdf.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    // Reusable objects
	    var S  = [];
	    var C_ = [];
	    var G  = [];

	    /**
	     * Rabbit stream cipher algorithm.
	     *
	     * This is a legacy version that neglected to convert the key to little-endian.
	     * This error doesn't affect the cipher's security,
	     * but it does affect its compatibility with other implementations.
	     */
	    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var K = this._key.words;
	            var iv = this.cfg.iv;

	            // Generate initial state values
	            var X = this._X = [
	                K[0], (K[3] << 16) | (K[2] >>> 16),
	                K[1], (K[0] << 16) | (K[3] >>> 16),
	                K[2], (K[1] << 16) | (K[0] >>> 16),
	                K[3], (K[2] << 16) | (K[1] >>> 16)
	            ];

	            // Generate initial counter values
	            var C = this._C = [
	                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
	                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
	                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
	                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
	            ];

	            // Carry bit
	            this._b = 0;

	            // Iterate the system four times
	            for (var i = 0; i < 4; i++) {
	                nextState.call(this);
	            }

	            // Modify the counters
	            for (var i = 0; i < 8; i++) {
	                C[i] ^= X[(i + 4) & 7];
	            }

	            // IV setup
	            if (iv) {
	                // Shortcuts
	                var IV = iv.words;
	                var IV_0 = IV[0];
	                var IV_1 = IV[1];

	                // Generate four subvectors
	                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
	                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
	                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
	                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

	                // Modify counter values
	                C[0] ^= i0;
	                C[1] ^= i1;
	                C[2] ^= i2;
	                C[3] ^= i3;
	                C[4] ^= i0;
	                C[5] ^= i1;
	                C[6] ^= i2;
	                C[7] ^= i3;

	                // Iterate the system four times
	                for (var i = 0; i < 4; i++) {
	                    nextState.call(this);
	                }
	            }
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var X = this._X;

	            // Iterate the system
	            nextState.call(this);

	            // Generate four keystream words
	            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
	            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
	            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
	            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

	            for (var i = 0; i < 4; i++) {
	                // Swap endian
	                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
	                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

	                // Encrypt
	                M[offset + i] ^= S[i];
	            }
	        },

	        blockSize: 128/32,

	        ivSize: 64/32
	    });

	    function nextState() {
	        // Shortcuts
	        var X = this._X;
	        var C = this._C;

	        // Save old counter values
	        for (var i = 0; i < 8; i++) {
	            C_[i] = C[i];
	        }

	        // Calculate new counter values
	        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
	        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
	        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
	        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
	        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
	        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
	        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
	        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
	        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

	        // Calculate the g-values
	        for (var i = 0; i < 8; i++) {
	            var gx = X[i] + C[i];

	            // Construct high and low argument for squaring
	            var ga = gx & 0xffff;
	            var gb = gx >>> 16;

	            // Calculate high and low result of squaring
	            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
	            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

	            // High XOR low
	            G[i] = gh ^ gl;
	        }

	        // Calculate new state values
	        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
	        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
	        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
	        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
	        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
	        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
	        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
	        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
	     */
	    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
	}());


	return CryptoJS.RabbitLegacy;

}));

/***/ }),

/***/ "../node_modules/crypto-js/rabbit.js":
/*!*******************************************!*\
  !*** ../node_modules/crypto-js/rabbit.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./enc-base64 */ "../node_modules/crypto-js/enc-base64.js"), __webpack_require__(/*! ./md5 */ "../node_modules/crypto-js/md5.js"), __webpack_require__(/*! ./evpkdf */ "../node_modules/crypto-js/evpkdf.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    // Reusable objects
	    var S  = [];
	    var C_ = [];
	    var G  = [];

	    /**
	     * Rabbit stream cipher algorithm
	     */
	    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var K = this._key.words;
	            var iv = this.cfg.iv;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                K[i] = (((K[i] << 8)  | (K[i] >>> 24)) & 0x00ff00ff) |
	                       (((K[i] << 24) | (K[i] >>> 8))  & 0xff00ff00);
	            }

	            // Generate initial state values
	            var X = this._X = [
	                K[0], (K[3] << 16) | (K[2] >>> 16),
	                K[1], (K[0] << 16) | (K[3] >>> 16),
	                K[2], (K[1] << 16) | (K[0] >>> 16),
	                K[3], (K[2] << 16) | (K[1] >>> 16)
	            ];

	            // Generate initial counter values
	            var C = this._C = [
	                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
	                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
	                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
	                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
	            ];

	            // Carry bit
	            this._b = 0;

	            // Iterate the system four times
	            for (var i = 0; i < 4; i++) {
	                nextState.call(this);
	            }

	            // Modify the counters
	            for (var i = 0; i < 8; i++) {
	                C[i] ^= X[(i + 4) & 7];
	            }

	            // IV setup
	            if (iv) {
	                // Shortcuts
	                var IV = iv.words;
	                var IV_0 = IV[0];
	                var IV_1 = IV[1];

	                // Generate four subvectors
	                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
	                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
	                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
	                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

	                // Modify counter values
	                C[0] ^= i0;
	                C[1] ^= i1;
	                C[2] ^= i2;
	                C[3] ^= i3;
	                C[4] ^= i0;
	                C[5] ^= i1;
	                C[6] ^= i2;
	                C[7] ^= i3;

	                // Iterate the system four times
	                for (var i = 0; i < 4; i++) {
	                    nextState.call(this);
	                }
	            }
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var X = this._X;

	            // Iterate the system
	            nextState.call(this);

	            // Generate four keystream words
	            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
	            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
	            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
	            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

	            for (var i = 0; i < 4; i++) {
	                // Swap endian
	                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
	                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

	                // Encrypt
	                M[offset + i] ^= S[i];
	            }
	        },

	        blockSize: 128/32,

	        ivSize: 64/32
	    });

	    function nextState() {
	        // Shortcuts
	        var X = this._X;
	        var C = this._C;

	        // Save old counter values
	        for (var i = 0; i < 8; i++) {
	            C_[i] = C[i];
	        }

	        // Calculate new counter values
	        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
	        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
	        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
	        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
	        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
	        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
	        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
	        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
	        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

	        // Calculate the g-values
	        for (var i = 0; i < 8; i++) {
	            var gx = X[i] + C[i];

	            // Construct high and low argument for squaring
	            var ga = gx & 0xffff;
	            var gb = gx >>> 16;

	            // Calculate high and low result of squaring
	            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
	            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

	            // High XOR low
	            G[i] = gh ^ gl;
	        }

	        // Calculate new state values
	        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
	        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
	        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
	        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
	        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
	        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
	        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
	        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
	     */
	    C.Rabbit = StreamCipher._createHelper(Rabbit);
	}());


	return CryptoJS.Rabbit;

}));

/***/ }),

/***/ "../node_modules/crypto-js/rc4.js":
/*!****************************************!*\
  !*** ../node_modules/crypto-js/rc4.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./enc-base64 */ "../node_modules/crypto-js/enc-base64.js"), __webpack_require__(/*! ./md5 */ "../node_modules/crypto-js/md5.js"), __webpack_require__(/*! ./evpkdf */ "../node_modules/crypto-js/evpkdf.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    /**
	     * RC4 stream cipher algorithm.
	     */
	    var RC4 = C_algo.RC4 = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;
	            var keySigBytes = key.sigBytes;

	            // Init sbox
	            var S = this._S = [];
	            for (var i = 0; i < 256; i++) {
	                S[i] = i;
	            }

	            // Key setup
	            for (var i = 0, j = 0; i < 256; i++) {
	                var keyByteIndex = i % keySigBytes;
	                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;

	                j = (j + S[i] + keyByte) % 256;

	                // Swap
	                var t = S[i];
	                S[i] = S[j];
	                S[j] = t;
	            }

	            // Counters
	            this._i = this._j = 0;
	        },

	        _doProcessBlock: function (M, offset) {
	            M[offset] ^= generateKeystreamWord.call(this);
	        },

	        keySize: 256/32,

	        ivSize: 0
	    });

	    function generateKeystreamWord() {
	        // Shortcuts
	        var S = this._S;
	        var i = this._i;
	        var j = this._j;

	        // Generate keystream word
	        var keystreamWord = 0;
	        for (var n = 0; n < 4; n++) {
	            i = (i + 1) % 256;
	            j = (j + S[i]) % 256;

	            // Swap
	            var t = S[i];
	            S[i] = S[j];
	            S[j] = t;

	            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
	        }

	        // Update counters
	        this._i = i;
	        this._j = j;

	        return keystreamWord;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
	     */
	    C.RC4 = StreamCipher._createHelper(RC4);

	    /**
	     * Modified RC4 stream cipher algorithm.
	     */
	    var RC4Drop = C_algo.RC4Drop = RC4.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} drop The number of keystream words to drop. Default 192
	         */
	        cfg: RC4.cfg.extend({
	            drop: 192
	        }),

	        _doReset: function () {
	            RC4._doReset.call(this);

	            // Drop
	            for (var i = this.cfg.drop; i > 0; i--) {
	                generateKeystreamWord.call(this);
	            }
	        }
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
	     */
	    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
	}());


	return CryptoJS.RC4;

}));

/***/ }),

/***/ "../node_modules/crypto-js/ripemd160.js":
/*!**********************************************!*\
  !*** ../node_modules/crypto-js/ripemd160.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var _zl = WordArray.create([
	        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	        7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	        3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	        1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	        4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13]);
	    var _zr = WordArray.create([
	        5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	        6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	        15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	        8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	        12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11]);
	    var _sl = WordArray.create([
	         11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	        7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	        11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	          11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	        9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ]);
	    var _sr = WordArray.create([
	        8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	        9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	        9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	        15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	        8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ]);

	    var _hl =  WordArray.create([ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
	    var _hr =  WordArray.create([ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

	    /**
	     * RIPEMD160 hash algorithm.
	     */
	    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
	        _doReset: function () {
	            this._hash  = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
	        },

	        _doProcessBlock: function (M, offset) {

	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                // Swap
	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }
	            // Shortcut
	            var H  = this._hash.words;
	            var hl = _hl.words;
	            var hr = _hr.words;
	            var zl = _zl.words;
	            var zr = _zr.words;
	            var sl = _sl.words;
	            var sr = _sr.words;

	            // Working variables
	            var al, bl, cl, dl, el;
	            var ar, br, cr, dr, er;

	            ar = al = H[0];
	            br = bl = H[1];
	            cr = cl = H[2];
	            dr = dl = H[3];
	            er = el = H[4];
	            // Computation
	            var t;
	            for (var i = 0; i < 80; i += 1) {
	                t = (al +  M[offset+zl[i]])|0;
	                if (i<16){
		            t +=  f1(bl,cl,dl) + hl[0];
	                } else if (i<32) {
		            t +=  f2(bl,cl,dl) + hl[1];
	                } else if (i<48) {
		            t +=  f3(bl,cl,dl) + hl[2];
	                } else if (i<64) {
		            t +=  f4(bl,cl,dl) + hl[3];
	                } else {// if (i<80) {
		            t +=  f5(bl,cl,dl) + hl[4];
	                }
	                t = t|0;
	                t =  rotl(t,sl[i]);
	                t = (t+el)|0;
	                al = el;
	                el = dl;
	                dl = rotl(cl, 10);
	                cl = bl;
	                bl = t;

	                t = (ar + M[offset+zr[i]])|0;
	                if (i<16){
		            t +=  f5(br,cr,dr) + hr[0];
	                } else if (i<32) {
		            t +=  f4(br,cr,dr) + hr[1];
	                } else if (i<48) {
		            t +=  f3(br,cr,dr) + hr[2];
	                } else if (i<64) {
		            t +=  f2(br,cr,dr) + hr[3];
	                } else {// if (i<80) {
		            t +=  f1(br,cr,dr) + hr[4];
	                }
	                t = t|0;
	                t =  rotl(t,sr[i]) ;
	                t = (t+er)|0;
	                ar = er;
	                er = dr;
	                dr = rotl(cr, 10);
	                cr = br;
	                br = t;
	            }
	            // Intermediate hash value
	            t    = (H[1] + cl + dr)|0;
	            H[1] = (H[2] + dl + er)|0;
	            H[2] = (H[3] + el + ar)|0;
	            H[3] = (H[4] + al + br)|0;
	            H[4] = (H[0] + bl + cr)|0;
	            H[0] =  t;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	            );
	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 5; i++) {
	                // Shortcut
	                var H_i = H[i];

	                // Swap
	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });


	    function f1(x, y, z) {
	        return ((x) ^ (y) ^ (z));

	    }

	    function f2(x, y, z) {
	        return (((x)&(y)) | ((~x)&(z)));
	    }

	    function f3(x, y, z) {
	        return (((x) | (~(y))) ^ (z));
	    }

	    function f4(x, y, z) {
	        return (((x) & (z)) | ((y)&(~(z))));
	    }

	    function f5(x, y, z) {
	        return ((x) ^ ((y) |(~(z))));

	    }

	    function rotl(x,n) {
	        return (x<<n) | (x>>>(32-n));
	    }


	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.RIPEMD160('message');
	     *     var hash = CryptoJS.RIPEMD160(wordArray);
	     */
	    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
	     */
	    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
	}(Math));


	return CryptoJS.RIPEMD160;

}));

/***/ }),

/***/ "../node_modules/crypto-js/sha1.js":
/*!*****************************************!*\
  !*** ../node_modules/crypto-js/sha1.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-1 hash algorithm.
	     */
	    var SHA1 = C_algo.SHA1 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476,
	                0xc3d2e1f0
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];

	            // Computation
	            for (var i = 0; i < 80; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
	                    W[i] = (n << 1) | (n >>> 31);
	                }

	                var t = ((a << 5) | (a >>> 27)) + e + W[i];
	                if (i < 20) {
	                    t += ((b & c) | (~b & d)) + 0x5a827999;
	                } else if (i < 40) {
	                    t += (b ^ c ^ d) + 0x6ed9eba1;
	                } else if (i < 60) {
	                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
	                } else /* if (i < 80) */ {
	                    t += (b ^ c ^ d) - 0x359d3e2a;
	                }

	                e = d;
	                d = c;
	                c = (b << 30) | (b >>> 2);
	                b = a;
	                a = t;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA1('message');
	     *     var hash = CryptoJS.SHA1(wordArray);
	     */
	    C.SHA1 = Hasher._createHelper(SHA1);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA1(message, key);
	     */
	    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	}());


	return CryptoJS.SHA1;

}));

/***/ }),

/***/ "../node_modules/crypto-js/sha224.js":
/*!*******************************************!*\
  !*** ../node_modules/crypto-js/sha224.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./sha256 */ "../node_modules/crypto-js/sha256.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA256 = C_algo.SHA256;

	    /**
	     * SHA-224 hash algorithm.
	     */
	    var SHA224 = C_algo.SHA224 = SHA256.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
	                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
	            ]);
	        },

	        _doFinalize: function () {
	            var hash = SHA256._doFinalize.call(this);

	            hash.sigBytes -= 4;

	            return hash;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA224('message');
	     *     var hash = CryptoJS.SHA224(wordArray);
	     */
	    C.SHA224 = SHA256._createHelper(SHA224);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA224(message, key);
	     */
	    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
	}());


	return CryptoJS.SHA224;

}));

/***/ }),

/***/ "../node_modules/crypto-js/sha256.js":
/*!*******************************************!*\
  !*** ../node_modules/crypto-js/sha256.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));

/***/ }),

/***/ "../node_modules/crypto-js/sha3.js":
/*!*****************************************!*\
  !*** ../node_modules/crypto-js/sha3.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./x64-core */ "../node_modules/crypto-js/x64-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var C_algo = C.algo;

	    // Constants tables
	    var RHO_OFFSETS = [];
	    var PI_INDEXES  = [];
	    var ROUND_CONSTANTS = [];

	    // Compute Constants
	    (function () {
	        // Compute rho offset constants
	        var x = 1, y = 0;
	        for (var t = 0; t < 24; t++) {
	            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;

	            var newX = y % 5;
	            var newY = (2 * x + 3 * y) % 5;
	            x = newX;
	            y = newY;
	        }

	        // Compute pi index constants
	        for (var x = 0; x < 5; x++) {
	            for (var y = 0; y < 5; y++) {
	                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
	            }
	        }

	        // Compute round constants
	        var LFSR = 0x01;
	        for (var i = 0; i < 24; i++) {
	            var roundConstantMsw = 0;
	            var roundConstantLsw = 0;

	            for (var j = 0; j < 7; j++) {
	                if (LFSR & 0x01) {
	                    var bitPosition = (1 << j) - 1;
	                    if (bitPosition < 32) {
	                        roundConstantLsw ^= 1 << bitPosition;
	                    } else /* if (bitPosition >= 32) */ {
	                        roundConstantMsw ^= 1 << (bitPosition - 32);
	                    }
	                }

	                // Compute next LFSR
	                if (LFSR & 0x80) {
	                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
	                    LFSR = (LFSR << 1) ^ 0x71;
	                } else {
	                    LFSR <<= 1;
	                }
	            }

	            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
	        }
	    }());

	    // Reusable objects for temporary values
	    var T = [];
	    (function () {
	        for (var i = 0; i < 25; i++) {
	            T[i] = X64Word.create();
	        }
	    }());

	    /**
	     * SHA-3 hash algorithm.
	     */
	    var SHA3 = C_algo.SHA3 = Hasher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} outputLength
	         *   The desired number of bits in the output hash.
	         *   Only values permitted are: 224, 256, 384, 512.
	         *   Default: 512
	         */
	        cfg: Hasher.cfg.extend({
	            outputLength: 512
	        }),

	        _doReset: function () {
	            var state = this._state = []
	            for (var i = 0; i < 25; i++) {
	                state[i] = new X64Word.init();
	            }

	            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var state = this._state;
	            var nBlockSizeLanes = this.blockSize / 2;

	            // Absorb
	            for (var i = 0; i < nBlockSizeLanes; i++) {
	                // Shortcuts
	                var M2i  = M[offset + 2 * i];
	                var M2i1 = M[offset + 2 * i + 1];

	                // Swap endian
	                M2i = (
	                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |
	                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)
	                );
	                M2i1 = (
	                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |
	                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)
	                );

	                // Absorb message into state
	                var lane = state[i];
	                lane.high ^= M2i1;
	                lane.low  ^= M2i;
	            }

	            // Rounds
	            for (var round = 0; round < 24; round++) {
	                // Theta
	                for (var x = 0; x < 5; x++) {
	                    // Mix column lanes
	                    var tMsw = 0, tLsw = 0;
	                    for (var y = 0; y < 5; y++) {
	                        var lane = state[x + 5 * y];
	                        tMsw ^= lane.high;
	                        tLsw ^= lane.low;
	                    }

	                    // Temporary values
	                    var Tx = T[x];
	                    Tx.high = tMsw;
	                    Tx.low  = tLsw;
	                }
	                for (var x = 0; x < 5; x++) {
	                    // Shortcuts
	                    var Tx4 = T[(x + 4) % 5];
	                    var Tx1 = T[(x + 1) % 5];
	                    var Tx1Msw = Tx1.high;
	                    var Tx1Lsw = Tx1.low;

	                    // Mix surrounding columns
	                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
	                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
	                    for (var y = 0; y < 5; y++) {
	                        var lane = state[x + 5 * y];
	                        lane.high ^= tMsw;
	                        lane.low  ^= tLsw;
	                    }
	                }

	                // Rho Pi
	                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
	                    // Shortcuts
	                    var lane = state[laneIndex];
	                    var laneMsw = lane.high;
	                    var laneLsw = lane.low;
	                    var rhoOffset = RHO_OFFSETS[laneIndex];

	                    // Rotate lanes
	                    if (rhoOffset < 32) {
	                        var tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
	                        var tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
	                    } else /* if (rhoOffset >= 32) */ {
	                        var tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
	                        var tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
	                    }

	                    // Transpose lanes
	                    var TPiLane = T[PI_INDEXES[laneIndex]];
	                    TPiLane.high = tMsw;
	                    TPiLane.low  = tLsw;
	                }

	                // Rho pi at x = y = 0
	                var T0 = T[0];
	                var state0 = state[0];
	                T0.high = state0.high;
	                T0.low  = state0.low;

	                // Chi
	                for (var x = 0; x < 5; x++) {
	                    for (var y = 0; y < 5; y++) {
	                        // Shortcuts
	                        var laneIndex = x + 5 * y;
	                        var lane = state[laneIndex];
	                        var TLane = T[laneIndex];
	                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
	                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];

	                        // Mix rows
	                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
	                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);
	                    }
	                }

	                // Iota
	                var lane = state[0];
	                var roundConstant = ROUND_CONSTANTS[round];
	                lane.high ^= roundConstant.high;
	                lane.low  ^= roundConstant.low;;
	            }
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;
	            var blockSizeBits = this.blockSize * 32;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
	            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var state = this._state;
	            var outputLengthBytes = this.cfg.outputLength / 8;
	            var outputLengthLanes = outputLengthBytes / 8;

	            // Squeeze
	            var hashWords = [];
	            for (var i = 0; i < outputLengthLanes; i++) {
	                // Shortcuts
	                var lane = state[i];
	                var laneMsw = lane.high;
	                var laneLsw = lane.low;

	                // Swap endian
	                laneMsw = (
	                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |
	                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)
	                );
	                laneLsw = (
	                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |
	                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)
	                );

	                // Squeeze state to retrieve hash
	                hashWords.push(laneLsw);
	                hashWords.push(laneMsw);
	            }

	            // Return final computed hash
	            return new WordArray.init(hashWords, outputLengthBytes);
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);

	            var state = clone._state = this._state.slice(0);
	            for (var i = 0; i < 25; i++) {
	                state[i] = state[i].clone();
	            }

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA3('message');
	     *     var hash = CryptoJS.SHA3(wordArray);
	     */
	    C.SHA3 = Hasher._createHelper(SHA3);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA3(message, key);
	     */
	    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
	}(Math));


	return CryptoJS.SHA3;

}));

/***/ }),

/***/ "../node_modules/crypto-js/sha384.js":
/*!*******************************************!*\
  !*** ../node_modules/crypto-js/sha384.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./x64-core */ "../node_modules/crypto-js/x64-core.js"), __webpack_require__(/*! ./sha512 */ "../node_modules/crypto-js/sha512.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;
	    var SHA512 = C_algo.SHA512;

	    /**
	     * SHA-384 hash algorithm.
	     */
	    var SHA384 = C_algo.SHA384 = SHA512.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
	                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
	                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
	                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
	            ]);
	        },

	        _doFinalize: function () {
	            var hash = SHA512._doFinalize.call(this);

	            hash.sigBytes -= 16;

	            return hash;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA384('message');
	     *     var hash = CryptoJS.SHA384(wordArray);
	     */
	    C.SHA384 = SHA512._createHelper(SHA384);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA384(message, key);
	     */
	    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
	}());


	return CryptoJS.SHA384;

}));

/***/ }),

/***/ "../node_modules/crypto-js/sha512.js":
/*!*******************************************!*\
  !*** ../node_modules/crypto-js/sha512.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./x64-core */ "../node_modules/crypto-js/x64-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;

	    function X64Word_create() {
	        return X64Word.create.apply(X64Word, arguments);
	    }

	    // Constants
	    var K = [
	        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
	        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
	        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
	        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
	        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
	        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
	        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
	        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
	        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
	        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
	        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
	        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
	        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
	        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
	        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
	        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
	        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
	        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
	        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
	        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
	        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
	        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
	        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
	        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
	        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
	        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
	        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
	        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
	        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
	        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
	        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
	        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
	        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
	        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
	        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
	        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
	        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
	        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
	        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
	        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
	    ];

	    // Reusable objects
	    var W = [];
	    (function () {
	        for (var i = 0; i < 80; i++) {
	            W[i] = X64Word_create();
	        }
	    }());

	    /**
	     * SHA-512 hash algorithm.
	     */
	    var SHA512 = C_algo.SHA512 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
	                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
	                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
	                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var H = this._hash.words;

	            var H0 = H[0];
	            var H1 = H[1];
	            var H2 = H[2];
	            var H3 = H[3];
	            var H4 = H[4];
	            var H5 = H[5];
	            var H6 = H[6];
	            var H7 = H[7];

	            var H0h = H0.high;
	            var H0l = H0.low;
	            var H1h = H1.high;
	            var H1l = H1.low;
	            var H2h = H2.high;
	            var H2l = H2.low;
	            var H3h = H3.high;
	            var H3l = H3.low;
	            var H4h = H4.high;
	            var H4l = H4.low;
	            var H5h = H5.high;
	            var H5l = H5.low;
	            var H6h = H6.high;
	            var H6l = H6.low;
	            var H7h = H7.high;
	            var H7l = H7.low;

	            // Working variables
	            var ah = H0h;
	            var al = H0l;
	            var bh = H1h;
	            var bl = H1l;
	            var ch = H2h;
	            var cl = H2l;
	            var dh = H3h;
	            var dl = H3l;
	            var eh = H4h;
	            var el = H4l;
	            var fh = H5h;
	            var fl = H5l;
	            var gh = H6h;
	            var gl = H6l;
	            var hh = H7h;
	            var hl = H7l;

	            // Rounds
	            for (var i = 0; i < 80; i++) {
	                // Shortcut
	                var Wi = W[i];

	                // Extend message
	                if (i < 16) {
	                    var Wih = Wi.high = M[offset + i * 2]     | 0;
	                    var Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
	                } else {
	                    // Gamma0
	                    var gamma0x  = W[i - 15];
	                    var gamma0xh = gamma0x.high;
	                    var gamma0xl = gamma0x.low;
	                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
	                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

	                    // Gamma1
	                    var gamma1x  = W[i - 2];
	                    var gamma1xh = gamma1x.high;
	                    var gamma1xl = gamma1x.low;
	                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
	                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

	                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	                    var Wi7  = W[i - 7];
	                    var Wi7h = Wi7.high;
	                    var Wi7l = Wi7.low;

	                    var Wi16  = W[i - 16];
	                    var Wi16h = Wi16.high;
	                    var Wi16l = Wi16.low;

	                    var Wil = gamma0l + Wi7l;
	                    var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
	                    var Wil = Wil + gamma1l;
	                    var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
	                    var Wil = Wil + Wi16l;
	                    var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

	                    Wi.high = Wih;
	                    Wi.low  = Wil;
	                }

	                var chh  = (eh & fh) ^ (~eh & gh);
	                var chl  = (el & fl) ^ (~el & gl);
	                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
	                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

	                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
	                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
	                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
	                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

	                // t1 = h + sigma1 + ch + K[i] + W[i]
	                var Ki  = K[i];
	                var Kih = Ki.high;
	                var Kil = Ki.low;

	                var t1l = hl + sigma1l;
	                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
	                var t1l = t1l + chl;
	                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
	                var t1l = t1l + Kil;
	                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
	                var t1l = t1l + Wil;
	                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

	                // t2 = sigma0 + maj
	                var t2l = sigma0l + majl;
	                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

	                // Update working variables
	                hh = gh;
	                hl = gl;
	                gh = fh;
	                gl = fl;
	                fh = eh;
	                fl = el;
	                el = (dl + t1l) | 0;
	                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
	                dh = ch;
	                dl = cl;
	                ch = bh;
	                cl = bl;
	                bh = ah;
	                bl = al;
	                al = (t1l + t2l) | 0;
	                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
	            }

	            // Intermediate hash value
	            H0l = H0.low  = (H0l + al);
	            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
	            H1l = H1.low  = (H1l + bl);
	            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
	            H2l = H2.low  = (H2l + cl);
	            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
	            H3l = H3.low  = (H3l + dl);
	            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
	            H4l = H4.low  = (H4l + el);
	            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
	            H5l = H5.low  = (H5l + fl);
	            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
	            H6l = H6.low  = (H6l + gl);
	            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
	            H7l = H7.low  = (H7l + hl);
	            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Convert hash to 32-bit word array before returning
	            var hash = this._hash.toX32();

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        },

	        blockSize: 1024/32
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA512('message');
	     *     var hash = CryptoJS.SHA512(wordArray);
	     */
	    C.SHA512 = Hasher._createHelper(SHA512);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA512(message, key);
	     */
	    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
	}());


	return CryptoJS.SHA512;

}));

/***/ }),

/***/ "../node_modules/crypto-js/tripledes.js":
/*!**********************************************!*\
  !*** ../node_modules/crypto-js/tripledes.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"), __webpack_require__(/*! ./enc-base64 */ "../node_modules/crypto-js/enc-base64.js"), __webpack_require__(/*! ./md5 */ "../node_modules/crypto-js/md5.js"), __webpack_require__(/*! ./evpkdf */ "../node_modules/crypto-js/evpkdf.js"), __webpack_require__(/*! ./cipher-core */ "../node_modules/crypto-js/cipher-core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Permuted Choice 1 constants
	    var PC1 = [
	        57, 49, 41, 33, 25, 17, 9,  1,
	        58, 50, 42, 34, 26, 18, 10, 2,
	        59, 51, 43, 35, 27, 19, 11, 3,
	        60, 52, 44, 36, 63, 55, 47, 39,
	        31, 23, 15, 7,  62, 54, 46, 38,
	        30, 22, 14, 6,  61, 53, 45, 37,
	        29, 21, 13, 5,  28, 20, 12, 4
	    ];

	    // Permuted Choice 2 constants
	    var PC2 = [
	        14, 17, 11, 24, 1,  5,
	        3,  28, 15, 6,  21, 10,
	        23, 19, 12, 4,  26, 8,
	        16, 7,  27, 20, 13, 2,
	        41, 52, 31, 37, 47, 55,
	        30, 40, 51, 45, 33, 48,
	        44, 49, 39, 56, 34, 53,
	        46, 42, 50, 36, 29, 32
	    ];

	    // Cumulative bit shift constants
	    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

	    // SBOXes and round permutation constants
	    var SBOX_P = [
	        {
	            0x0: 0x808200,
	            0x10000000: 0x8000,
	            0x20000000: 0x808002,
	            0x30000000: 0x2,
	            0x40000000: 0x200,
	            0x50000000: 0x808202,
	            0x60000000: 0x800202,
	            0x70000000: 0x800000,
	            0x80000000: 0x202,
	            0x90000000: 0x800200,
	            0xa0000000: 0x8200,
	            0xb0000000: 0x808000,
	            0xc0000000: 0x8002,
	            0xd0000000: 0x800002,
	            0xe0000000: 0x0,
	            0xf0000000: 0x8202,
	            0x8000000: 0x0,
	            0x18000000: 0x808202,
	            0x28000000: 0x8202,
	            0x38000000: 0x8000,
	            0x48000000: 0x808200,
	            0x58000000: 0x200,
	            0x68000000: 0x808002,
	            0x78000000: 0x2,
	            0x88000000: 0x800200,
	            0x98000000: 0x8200,
	            0xa8000000: 0x808000,
	            0xb8000000: 0x800202,
	            0xc8000000: 0x800002,
	            0xd8000000: 0x8002,
	            0xe8000000: 0x202,
	            0xf8000000: 0x800000,
	            0x1: 0x8000,
	            0x10000001: 0x2,
	            0x20000001: 0x808200,
	            0x30000001: 0x800000,
	            0x40000001: 0x808002,
	            0x50000001: 0x8200,
	            0x60000001: 0x200,
	            0x70000001: 0x800202,
	            0x80000001: 0x808202,
	            0x90000001: 0x808000,
	            0xa0000001: 0x800002,
	            0xb0000001: 0x8202,
	            0xc0000001: 0x202,
	            0xd0000001: 0x800200,
	            0xe0000001: 0x8002,
	            0xf0000001: 0x0,
	            0x8000001: 0x808202,
	            0x18000001: 0x808000,
	            0x28000001: 0x800000,
	            0x38000001: 0x200,
	            0x48000001: 0x8000,
	            0x58000001: 0x800002,
	            0x68000001: 0x2,
	            0x78000001: 0x8202,
	            0x88000001: 0x8002,
	            0x98000001: 0x800202,
	            0xa8000001: 0x202,
	            0xb8000001: 0x808200,
	            0xc8000001: 0x800200,
	            0xd8000001: 0x0,
	            0xe8000001: 0x8200,
	            0xf8000001: 0x808002
	        },
	        {
	            0x0: 0x40084010,
	            0x1000000: 0x4000,
	            0x2000000: 0x80000,
	            0x3000000: 0x40080010,
	            0x4000000: 0x40000010,
	            0x5000000: 0x40084000,
	            0x6000000: 0x40004000,
	            0x7000000: 0x10,
	            0x8000000: 0x84000,
	            0x9000000: 0x40004010,
	            0xa000000: 0x40000000,
	            0xb000000: 0x84010,
	            0xc000000: 0x80010,
	            0xd000000: 0x0,
	            0xe000000: 0x4010,
	            0xf000000: 0x40080000,
	            0x800000: 0x40004000,
	            0x1800000: 0x84010,
	            0x2800000: 0x10,
	            0x3800000: 0x40004010,
	            0x4800000: 0x40084010,
	            0x5800000: 0x40000000,
	            0x6800000: 0x80000,
	            0x7800000: 0x40080010,
	            0x8800000: 0x80010,
	            0x9800000: 0x0,
	            0xa800000: 0x4000,
	            0xb800000: 0x40080000,
	            0xc800000: 0x40000010,
	            0xd800000: 0x84000,
	            0xe800000: 0x40084000,
	            0xf800000: 0x4010,
	            0x10000000: 0x0,
	            0x11000000: 0x40080010,
	            0x12000000: 0x40004010,
	            0x13000000: 0x40084000,
	            0x14000000: 0x40080000,
	            0x15000000: 0x10,
	            0x16000000: 0x84010,
	            0x17000000: 0x4000,
	            0x18000000: 0x4010,
	            0x19000000: 0x80000,
	            0x1a000000: 0x80010,
	            0x1b000000: 0x40000010,
	            0x1c000000: 0x84000,
	            0x1d000000: 0x40004000,
	            0x1e000000: 0x40000000,
	            0x1f000000: 0x40084010,
	            0x10800000: 0x84010,
	            0x11800000: 0x80000,
	            0x12800000: 0x40080000,
	            0x13800000: 0x4000,
	            0x14800000: 0x40004000,
	            0x15800000: 0x40084010,
	            0x16800000: 0x10,
	            0x17800000: 0x40000000,
	            0x18800000: 0x40084000,
	            0x19800000: 0x40000010,
	            0x1a800000: 0x40004010,
	            0x1b800000: 0x80010,
	            0x1c800000: 0x0,
	            0x1d800000: 0x4010,
	            0x1e800000: 0x40080010,
	            0x1f800000: 0x84000
	        },
	        {
	            0x0: 0x104,
	            0x100000: 0x0,
	            0x200000: 0x4000100,
	            0x300000: 0x10104,
	            0x400000: 0x10004,
	            0x500000: 0x4000004,
	            0x600000: 0x4010104,
	            0x700000: 0x4010000,
	            0x800000: 0x4000000,
	            0x900000: 0x4010100,
	            0xa00000: 0x10100,
	            0xb00000: 0x4010004,
	            0xc00000: 0x4000104,
	            0xd00000: 0x10000,
	            0xe00000: 0x4,
	            0xf00000: 0x100,
	            0x80000: 0x4010100,
	            0x180000: 0x4010004,
	            0x280000: 0x0,
	            0x380000: 0x4000100,
	            0x480000: 0x4000004,
	            0x580000: 0x10000,
	            0x680000: 0x10004,
	            0x780000: 0x104,
	            0x880000: 0x4,
	            0x980000: 0x100,
	            0xa80000: 0x4010000,
	            0xb80000: 0x10104,
	            0xc80000: 0x10100,
	            0xd80000: 0x4000104,
	            0xe80000: 0x4010104,
	            0xf80000: 0x4000000,
	            0x1000000: 0x4010100,
	            0x1100000: 0x10004,
	            0x1200000: 0x10000,
	            0x1300000: 0x4000100,
	            0x1400000: 0x100,
	            0x1500000: 0x4010104,
	            0x1600000: 0x4000004,
	            0x1700000: 0x0,
	            0x1800000: 0x4000104,
	            0x1900000: 0x4000000,
	            0x1a00000: 0x4,
	            0x1b00000: 0x10100,
	            0x1c00000: 0x4010000,
	            0x1d00000: 0x104,
	            0x1e00000: 0x10104,
	            0x1f00000: 0x4010004,
	            0x1080000: 0x4000000,
	            0x1180000: 0x104,
	            0x1280000: 0x4010100,
	            0x1380000: 0x0,
	            0x1480000: 0x10004,
	            0x1580000: 0x4000100,
	            0x1680000: 0x100,
	            0x1780000: 0x4010004,
	            0x1880000: 0x10000,
	            0x1980000: 0x4010104,
	            0x1a80000: 0x10104,
	            0x1b80000: 0x4000004,
	            0x1c80000: 0x4000104,
	            0x1d80000: 0x4010000,
	            0x1e80000: 0x4,
	            0x1f80000: 0x10100
	        },
	        {
	            0x0: 0x80401000,
	            0x10000: 0x80001040,
	            0x20000: 0x401040,
	            0x30000: 0x80400000,
	            0x40000: 0x0,
	            0x50000: 0x401000,
	            0x60000: 0x80000040,
	            0x70000: 0x400040,
	            0x80000: 0x80000000,
	            0x90000: 0x400000,
	            0xa0000: 0x40,
	            0xb0000: 0x80001000,
	            0xc0000: 0x80400040,
	            0xd0000: 0x1040,
	            0xe0000: 0x1000,
	            0xf0000: 0x80401040,
	            0x8000: 0x80001040,
	            0x18000: 0x40,
	            0x28000: 0x80400040,
	            0x38000: 0x80001000,
	            0x48000: 0x401000,
	            0x58000: 0x80401040,
	            0x68000: 0x0,
	            0x78000: 0x80400000,
	            0x88000: 0x1000,
	            0x98000: 0x80401000,
	            0xa8000: 0x400000,
	            0xb8000: 0x1040,
	            0xc8000: 0x80000000,
	            0xd8000: 0x400040,
	            0xe8000: 0x401040,
	            0xf8000: 0x80000040,
	            0x100000: 0x400040,
	            0x110000: 0x401000,
	            0x120000: 0x80000040,
	            0x130000: 0x0,
	            0x140000: 0x1040,
	            0x150000: 0x80400040,
	            0x160000: 0x80401000,
	            0x170000: 0x80001040,
	            0x180000: 0x80401040,
	            0x190000: 0x80000000,
	            0x1a0000: 0x80400000,
	            0x1b0000: 0x401040,
	            0x1c0000: 0x80001000,
	            0x1d0000: 0x400000,
	            0x1e0000: 0x40,
	            0x1f0000: 0x1000,
	            0x108000: 0x80400000,
	            0x118000: 0x80401040,
	            0x128000: 0x0,
	            0x138000: 0x401000,
	            0x148000: 0x400040,
	            0x158000: 0x80000000,
	            0x168000: 0x80001040,
	            0x178000: 0x40,
	            0x188000: 0x80000040,
	            0x198000: 0x1000,
	            0x1a8000: 0x80001000,
	            0x1b8000: 0x80400040,
	            0x1c8000: 0x1040,
	            0x1d8000: 0x80401000,
	            0x1e8000: 0x400000,
	            0x1f8000: 0x401040
	        },
	        {
	            0x0: 0x80,
	            0x1000: 0x1040000,
	            0x2000: 0x40000,
	            0x3000: 0x20000000,
	            0x4000: 0x20040080,
	            0x5000: 0x1000080,
	            0x6000: 0x21000080,
	            0x7000: 0x40080,
	            0x8000: 0x1000000,
	            0x9000: 0x20040000,
	            0xa000: 0x20000080,
	            0xb000: 0x21040080,
	            0xc000: 0x21040000,
	            0xd000: 0x0,
	            0xe000: 0x1040080,
	            0xf000: 0x21000000,
	            0x800: 0x1040080,
	            0x1800: 0x21000080,
	            0x2800: 0x80,
	            0x3800: 0x1040000,
	            0x4800: 0x40000,
	            0x5800: 0x20040080,
	            0x6800: 0x21040000,
	            0x7800: 0x20000000,
	            0x8800: 0x20040000,
	            0x9800: 0x0,
	            0xa800: 0x21040080,
	            0xb800: 0x1000080,
	            0xc800: 0x20000080,
	            0xd800: 0x21000000,
	            0xe800: 0x1000000,
	            0xf800: 0x40080,
	            0x10000: 0x40000,
	            0x11000: 0x80,
	            0x12000: 0x20000000,
	            0x13000: 0x21000080,
	            0x14000: 0x1000080,
	            0x15000: 0x21040000,
	            0x16000: 0x20040080,
	            0x17000: 0x1000000,
	            0x18000: 0x21040080,
	            0x19000: 0x21000000,
	            0x1a000: 0x1040000,
	            0x1b000: 0x20040000,
	            0x1c000: 0x40080,
	            0x1d000: 0x20000080,
	            0x1e000: 0x0,
	            0x1f000: 0x1040080,
	            0x10800: 0x21000080,
	            0x11800: 0x1000000,
	            0x12800: 0x1040000,
	            0x13800: 0x20040080,
	            0x14800: 0x20000000,
	            0x15800: 0x1040080,
	            0x16800: 0x80,
	            0x17800: 0x21040000,
	            0x18800: 0x40080,
	            0x19800: 0x21040080,
	            0x1a800: 0x0,
	            0x1b800: 0x21000000,
	            0x1c800: 0x1000080,
	            0x1d800: 0x40000,
	            0x1e800: 0x20040000,
	            0x1f800: 0x20000080
	        },
	        {
	            0x0: 0x10000008,
	            0x100: 0x2000,
	            0x200: 0x10200000,
	            0x300: 0x10202008,
	            0x400: 0x10002000,
	            0x500: 0x200000,
	            0x600: 0x200008,
	            0x700: 0x10000000,
	            0x800: 0x0,
	            0x900: 0x10002008,
	            0xa00: 0x202000,
	            0xb00: 0x8,
	            0xc00: 0x10200008,
	            0xd00: 0x202008,
	            0xe00: 0x2008,
	            0xf00: 0x10202000,
	            0x80: 0x10200000,
	            0x180: 0x10202008,
	            0x280: 0x8,
	            0x380: 0x200000,
	            0x480: 0x202008,
	            0x580: 0x10000008,
	            0x680: 0x10002000,
	            0x780: 0x2008,
	            0x880: 0x200008,
	            0x980: 0x2000,
	            0xa80: 0x10002008,
	            0xb80: 0x10200008,
	            0xc80: 0x0,
	            0xd80: 0x10202000,
	            0xe80: 0x202000,
	            0xf80: 0x10000000,
	            0x1000: 0x10002000,
	            0x1100: 0x10200008,
	            0x1200: 0x10202008,
	            0x1300: 0x2008,
	            0x1400: 0x200000,
	            0x1500: 0x10000000,
	            0x1600: 0x10000008,
	            0x1700: 0x202000,
	            0x1800: 0x202008,
	            0x1900: 0x0,
	            0x1a00: 0x8,
	            0x1b00: 0x10200000,
	            0x1c00: 0x2000,
	            0x1d00: 0x10002008,
	            0x1e00: 0x10202000,
	            0x1f00: 0x200008,
	            0x1080: 0x8,
	            0x1180: 0x202000,
	            0x1280: 0x200000,
	            0x1380: 0x10000008,
	            0x1480: 0x10002000,
	            0x1580: 0x2008,
	            0x1680: 0x10202008,
	            0x1780: 0x10200000,
	            0x1880: 0x10202000,
	            0x1980: 0x10200008,
	            0x1a80: 0x2000,
	            0x1b80: 0x202008,
	            0x1c80: 0x200008,
	            0x1d80: 0x0,
	            0x1e80: 0x10000000,
	            0x1f80: 0x10002008
	        },
	        {
	            0x0: 0x100000,
	            0x10: 0x2000401,
	            0x20: 0x400,
	            0x30: 0x100401,
	            0x40: 0x2100401,
	            0x50: 0x0,
	            0x60: 0x1,
	            0x70: 0x2100001,
	            0x80: 0x2000400,
	            0x90: 0x100001,
	            0xa0: 0x2000001,
	            0xb0: 0x2100400,
	            0xc0: 0x2100000,
	            0xd0: 0x401,
	            0xe0: 0x100400,
	            0xf0: 0x2000000,
	            0x8: 0x2100001,
	            0x18: 0x0,
	            0x28: 0x2000401,
	            0x38: 0x2100400,
	            0x48: 0x100000,
	            0x58: 0x2000001,
	            0x68: 0x2000000,
	            0x78: 0x401,
	            0x88: 0x100401,
	            0x98: 0x2000400,
	            0xa8: 0x2100000,
	            0xb8: 0x100001,
	            0xc8: 0x400,
	            0xd8: 0x2100401,
	            0xe8: 0x1,
	            0xf8: 0x100400,
	            0x100: 0x2000000,
	            0x110: 0x100000,
	            0x120: 0x2000401,
	            0x130: 0x2100001,
	            0x140: 0x100001,
	            0x150: 0x2000400,
	            0x160: 0x2100400,
	            0x170: 0x100401,
	            0x180: 0x401,
	            0x190: 0x2100401,
	            0x1a0: 0x100400,
	            0x1b0: 0x1,
	            0x1c0: 0x0,
	            0x1d0: 0x2100000,
	            0x1e0: 0x2000001,
	            0x1f0: 0x400,
	            0x108: 0x100400,
	            0x118: 0x2000401,
	            0x128: 0x2100001,
	            0x138: 0x1,
	            0x148: 0x2000000,
	            0x158: 0x100000,
	            0x168: 0x401,
	            0x178: 0x2100400,
	            0x188: 0x2000001,
	            0x198: 0x2100000,
	            0x1a8: 0x0,
	            0x1b8: 0x2100401,
	            0x1c8: 0x100401,
	            0x1d8: 0x400,
	            0x1e8: 0x2000400,
	            0x1f8: 0x100001
	        },
	        {
	            0x0: 0x8000820,
	            0x1: 0x20000,
	            0x2: 0x8000000,
	            0x3: 0x20,
	            0x4: 0x20020,
	            0x5: 0x8020820,
	            0x6: 0x8020800,
	            0x7: 0x800,
	            0x8: 0x8020000,
	            0x9: 0x8000800,
	            0xa: 0x20800,
	            0xb: 0x8020020,
	            0xc: 0x820,
	            0xd: 0x0,
	            0xe: 0x8000020,
	            0xf: 0x20820,
	            0x80000000: 0x800,
	            0x80000001: 0x8020820,
	            0x80000002: 0x8000820,
	            0x80000003: 0x8000000,
	            0x80000004: 0x8020000,
	            0x80000005: 0x20800,
	            0x80000006: 0x20820,
	            0x80000007: 0x20,
	            0x80000008: 0x8000020,
	            0x80000009: 0x820,
	            0x8000000a: 0x20020,
	            0x8000000b: 0x8020800,
	            0x8000000c: 0x0,
	            0x8000000d: 0x8020020,
	            0x8000000e: 0x8000800,
	            0x8000000f: 0x20000,
	            0x10: 0x20820,
	            0x11: 0x8020800,
	            0x12: 0x20,
	            0x13: 0x800,
	            0x14: 0x8000800,
	            0x15: 0x8000020,
	            0x16: 0x8020020,
	            0x17: 0x20000,
	            0x18: 0x0,
	            0x19: 0x20020,
	            0x1a: 0x8020000,
	            0x1b: 0x8000820,
	            0x1c: 0x8020820,
	            0x1d: 0x20800,
	            0x1e: 0x820,
	            0x1f: 0x8000000,
	            0x80000010: 0x20000,
	            0x80000011: 0x800,
	            0x80000012: 0x8020020,
	            0x80000013: 0x20820,
	            0x80000014: 0x20,
	            0x80000015: 0x8020000,
	            0x80000016: 0x8000000,
	            0x80000017: 0x8000820,
	            0x80000018: 0x8020820,
	            0x80000019: 0x8000020,
	            0x8000001a: 0x8000800,
	            0x8000001b: 0x0,
	            0x8000001c: 0x20800,
	            0x8000001d: 0x820,
	            0x8000001e: 0x20020,
	            0x8000001f: 0x8020800
	        }
	    ];

	    // Masks that select the SBOX input
	    var SBOX_MASK = [
	        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
	        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
	    ];

	    /**
	     * DES block cipher algorithm.
	     */
	    var DES = C_algo.DES = BlockCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;

	            // Select 56 bits according to PC1
	            var keyBits = [];
	            for (var i = 0; i < 56; i++) {
	                var keyBitPos = PC1[i] - 1;
	                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
	            }

	            // Assemble 16 subkeys
	            var subKeys = this._subKeys = [];
	            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
	                // Create subkey
	                var subKey = subKeys[nSubKey] = [];

	                // Shortcut
	                var bitShift = BIT_SHIFTS[nSubKey];

	                // Select 48 bits according to PC2
	                for (var i = 0; i < 24; i++) {
	                    // Select from the left 28 key bits
	                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);

	                    // Select from the right 28 key bits
	                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
	                }

	                // Since each subkey is applied to an expanded 32-bit input,
	                // the subkey can be broken into 8 values scaled to 32-bits,
	                // which allows the key to be used without expansion
	                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
	                for (var i = 1; i < 7; i++) {
	                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
	                }
	                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
	            }

	            // Compute inverse subkeys
	            var invSubKeys = this._invSubKeys = [];
	            for (var i = 0; i < 16; i++) {
	                invSubKeys[i] = subKeys[15 - i];
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._subKeys);
	        },

	        decryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._invSubKeys);
	        },

	        _doCryptBlock: function (M, offset, subKeys) {
	            // Get input
	            this._lBlock = M[offset];
	            this._rBlock = M[offset + 1];

	            // Initial permutation
	            exchangeLR.call(this, 4,  0x0f0f0f0f);
	            exchangeLR.call(this, 16, 0x0000ffff);
	            exchangeRL.call(this, 2,  0x33333333);
	            exchangeRL.call(this, 8,  0x00ff00ff);
	            exchangeLR.call(this, 1,  0x55555555);

	            // Rounds
	            for (var round = 0; round < 16; round++) {
	                // Shortcuts
	                var subKey = subKeys[round];
	                var lBlock = this._lBlock;
	                var rBlock = this._rBlock;

	                // Feistel function
	                var f = 0;
	                for (var i = 0; i < 8; i++) {
	                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
	                }
	                this._lBlock = rBlock;
	                this._rBlock = lBlock ^ f;
	            }

	            // Undo swap from last round
	            var t = this._lBlock;
	            this._lBlock = this._rBlock;
	            this._rBlock = t;

	            // Final permutation
	            exchangeLR.call(this, 1,  0x55555555);
	            exchangeRL.call(this, 8,  0x00ff00ff);
	            exchangeRL.call(this, 2,  0x33333333);
	            exchangeLR.call(this, 16, 0x0000ffff);
	            exchangeLR.call(this, 4,  0x0f0f0f0f);

	            // Set output
	            M[offset] = this._lBlock;
	            M[offset + 1] = this._rBlock;
	        },

	        keySize: 64/32,

	        ivSize: 64/32,

	        blockSize: 64/32
	    });

	    // Swap bits across the left and right words
	    function exchangeLR(offset, mask) {
	        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
	        this._rBlock ^= t;
	        this._lBlock ^= t << offset;
	    }

	    function exchangeRL(offset, mask) {
	        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
	        this._lBlock ^= t;
	        this._rBlock ^= t << offset;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
	     */
	    C.DES = BlockCipher._createHelper(DES);

	    /**
	     * Triple-DES block cipher algorithm.
	     */
	    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;

	            // Create DES instances
	            this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
	            this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
	            this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
	        },

	        encryptBlock: function (M, offset) {
	            this._des1.encryptBlock(M, offset);
	            this._des2.decryptBlock(M, offset);
	            this._des3.encryptBlock(M, offset);
	        },

	        decryptBlock: function (M, offset) {
	            this._des3.decryptBlock(M, offset);
	            this._des2.encryptBlock(M, offset);
	            this._des1.decryptBlock(M, offset);
	        },

	        keySize: 192/32,

	        ivSize: 64/32,

	        blockSize: 64/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
	     */
	    C.TripleDES = BlockCipher._createHelper(TripleDES);
	}());


	return CryptoJS.TripleDES;

}));

/***/ }),

/***/ "../node_modules/crypto-js/x64-core.js":
/*!*********************************************!*\
  !*** ../node_modules/crypto-js/x64-core.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "../node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var X32WordArray = C_lib.WordArray;

	    /**
	     * x64 namespace.
	     */
	    var C_x64 = C.x64 = {};

	    /**
	     * A 64-bit word.
	     */
	    var X64Word = C_x64.Word = Base.extend({
	        /**
	         * Initializes a newly created 64-bit word.
	         *
	         * @param {number} high The high 32 bits.
	         * @param {number} low The low 32 bits.
	         *
	         * @example
	         *
	         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
	         */
	        init: function (high, low) {
	            this.high = high;
	            this.low = low;
	        }

	        /**
	         * Bitwise NOTs this word.
	         *
	         * @return {X64Word} A new x64-Word object after negating.
	         *
	         * @example
	         *
	         *     var negated = x64Word.not();
	         */
	        // not: function () {
	            // var high = ~this.high;
	            // var low = ~this.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ANDs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to AND with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ANDing.
	         *
	         * @example
	         *
	         *     var anded = x64Word.and(anotherX64Word);
	         */
	        // and: function (word) {
	            // var high = this.high & word.high;
	            // var low = this.low & word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to OR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ORing.
	         *
	         * @example
	         *
	         *     var ored = x64Word.or(anotherX64Word);
	         */
	        // or: function (word) {
	            // var high = this.high | word.high;
	            // var low = this.low | word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise XORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to XOR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after XORing.
	         *
	         * @example
	         *
	         *     var xored = x64Word.xor(anotherX64Word);
	         */
	        // xor: function (word) {
	            // var high = this.high ^ word.high;
	            // var low = this.low ^ word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the left.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftL(25);
	         */
	        // shiftL: function (n) {
	            // if (n < 32) {
	                // var high = (this.high << n) | (this.low >>> (32 - n));
	                // var low = this.low << n;
	            // } else {
	                // var high = this.low << (n - 32);
	                // var low = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the right.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftR(7);
	         */
	        // shiftR: function (n) {
	            // if (n < 32) {
	                // var low = (this.low >>> n) | (this.high << (32 - n));
	                // var high = this.high >>> n;
	            // } else {
	                // var low = this.high >>> (n - 32);
	                // var high = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Rotates this word n bits to the left.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotL(25);
	         */
	        // rotL: function (n) {
	            // return this.shiftL(n).or(this.shiftR(64 - n));
	        // },

	        /**
	         * Rotates this word n bits to the right.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotR(7);
	         */
	        // rotR: function (n) {
	            // return this.shiftR(n).or(this.shiftL(64 - n));
	        // },

	        /**
	         * Adds this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to add with this word.
	         *
	         * @return {X64Word} A new x64-Word object after adding.
	         *
	         * @example
	         *
	         *     var added = x64Word.add(anotherX64Word);
	         */
	        // add: function (word) {
	            // var low = (this.low + word.low) | 0;
	            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
	            // var high = (this.high + word.high + carry) | 0;

	            // return X64Word.create(high, low);
	        // }
	    });

	    /**
	     * An array of 64-bit words.
	     *
	     * @property {Array} words The array of CryptoJS.x64.Word objects.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var X64WordArray = C_x64.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create();
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ]);
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ], 10);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 8;
	            }
	        },

	        /**
	         * Converts this 64-bit word array to a 32-bit word array.
	         *
	         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
	         *
	         * @example
	         *
	         *     var x32WordArray = x64WordArray.toX32();
	         */
	        toX32: function () {
	            // Shortcuts
	            var x64Words = this.words;
	            var x64WordsLength = x64Words.length;

	            // Convert
	            var x32Words = [];
	            for (var i = 0; i < x64WordsLength; i++) {
	                var x64Word = x64Words[i];
	                x32Words.push(x64Word.high);
	                x32Words.push(x64Word.low);
	            }

	            return X32WordArray.create(x32Words, this.sigBytes);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {X64WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = x64WordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);

	            // Clone "words" array
	            var words = clone.words = this.words.slice(0);

	            // Clone each X64Word object
	            var wordsLength = words.length;
	            for (var i = 0; i < wordsLength; i++) {
	                words[i] = words[i].clone();
	            }

	            return clone;
	        }
	    });
	}());


	return CryptoJS;

}));

/***/ }),

/***/ "../node_modules/oauth-1.0a/oauth-1.0a.js":
/*!************************************************!*\
  !*** ../node_modules/oauth-1.0a/oauth-1.0a.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (true) {
    module.exports = OAuth;
}

/**
 * Constructor
 * @param {Object} opts consumer key and secret
 */
function OAuth(opts) {
    if(!(this instanceof OAuth)) {
        return new OAuth(opts);
    }

    if(!opts) {
        opts = {};
    }

    if(!opts.consumer) {
        throw new Error('consumer option is required');
    }

    this.consumer            = opts.consumer;
    this.nonce_length        = opts.nonce_length || 32;
    this.version             = opts.version || '1.0';
    this.parameter_seperator = opts.parameter_seperator || ', ';
    this.realm               = opts.realm;

    if(typeof opts.last_ampersand === 'undefined') {
        this.last_ampersand = true;
    } else {
        this.last_ampersand = opts.last_ampersand;
    }

    // default signature_method is 'PLAINTEXT'
    this.signature_method = opts.signature_method || 'PLAINTEXT';

    if(this.signature_method == 'PLAINTEXT' && !opts.hash_function) {
        opts.hash_function = function(base_string, key) {
            return key;
        }
    }

    if(!opts.hash_function) {
        throw new Error('hash_function option is required');
    }

    this.hash_function = opts.hash_function;
    this.body_hash_function = opts.body_hash_function || this.hash_function;
}

/**
 * OAuth request authorize
 * @param  {Object} request data
 * {
 *     method,
 *     url,
 *     data
 * }
 * @param  {Object} key and secret token
 * @return {Object} OAuth Authorized data
 */
OAuth.prototype.authorize = function(request, token) {
    var oauth_data = {
        oauth_consumer_key: this.consumer.key,
        oauth_nonce: this.getNonce(),
        oauth_signature_method: this.signature_method,
        oauth_timestamp: this.getTimeStamp(),
        oauth_version: this.version
    };

    if(!token) {
        token = {};
    }

    if(token.key !== undefined) {
        oauth_data.oauth_token = token.key;
    }

    if(!request.data) {
        request.data = {};
    }

    if(request.includeBodyHash) {
      oauth_data.oauth_body_hash = this.getBodyHash(request, token.secret)
    }

    oauth_data.oauth_signature = this.getSignature(request, token.secret, oauth_data);

    return oauth_data;
};

/**
 * Create a OAuth Signature
 * @param  {Object} request data
 * @param  {Object} token_secret key and secret token
 * @param  {Object} oauth_data   OAuth data
 * @return {String} Signature
 */
OAuth.prototype.getSignature = function(request, token_secret, oauth_data) {
    return this.hash_function(this.getBaseString(request, oauth_data), this.getSigningKey(token_secret));
};

/**
 * Create a OAuth Body Hash
 * @param {Object} request data
 */
OAuth.prototype.getBodyHash = function(request, token_secret) {
  var body = typeof request.data === 'string' ? request.data : JSON.stringify(request.data)

  if (!this.body_hash_function) {
    throw new Error('body_hash_function option is required');
  }

  return this.body_hash_function(body, this.getSigningKey(token_secret))
};

/**
 * Base String = Method + Base Url + ParameterString
 * @param  {Object} request data
 * @param  {Object} OAuth data
 * @return {String} Base String
 */
OAuth.prototype.getBaseString = function(request, oauth_data) {
    return request.method.toUpperCase() + '&' + this.percentEncode(this.getBaseUrl(request.url)) + '&' + this.percentEncode(this.getParameterString(request, oauth_data));
};

/**
 * Get data from url
 * -> merge with oauth data
 * -> percent encode key & value
 * -> sort
 *
 * @param  {Object} request data
 * @param  {Object} OAuth data
 * @return {Object} Parameter string data
 */
OAuth.prototype.getParameterString = function(request, oauth_data) {
    var base_string_data;
    if (oauth_data.oauth_body_hash) {
        base_string_data = this.sortObject(this.percentEncodeData(this.mergeObject(oauth_data, this.deParamUrl(request.url))));
    } else {
        base_string_data = this.sortObject(this.percentEncodeData(this.mergeObject(oauth_data, this.mergeObject(request.data, this.deParamUrl(request.url)))));
    }

    var data_str = '';

    //base_string_data to string
    for(var i = 0; i < base_string_data.length; i++) {
        var key = base_string_data[i].key;
        var value = base_string_data[i].value;
        // check if the value is an array
        // this means that this key has multiple values
        if (value && Array.isArray(value)){
          // sort the array first
          value.sort();

          var valString = "";
          // serialize all values for this key: e.g. formkey=formvalue1&formkey=formvalue2
          value.forEach((function(item, i){
            valString += key + '=' + item;
            if (i < value.length){
              valString += "&";
            }
          }).bind(this));
          data_str += valString;
        } else {
          data_str += key + '=' + value + '&';
        }
    }

    //remove the last character
    data_str = data_str.substr(0, data_str.length - 1);
    return data_str;
};

/**
 * Create a Signing Key
 * @param  {String} token_secret Secret Token
 * @return {String} Signing Key
 */
OAuth.prototype.getSigningKey = function(token_secret) {
    token_secret = token_secret || '';

    if(!this.last_ampersand && !token_secret) {
        return this.percentEncode(this.consumer.secret);
    }

    return this.percentEncode(this.consumer.secret) + '&' + this.percentEncode(token_secret);
};

/**
 * Get base url
 * @param  {String} url
 * @return {String}
 */
OAuth.prototype.getBaseUrl = function(url) {
    return url.split('?')[0];
};

/**
 * Get data from String
 * @param  {String} string
 * @return {Object}
 */
OAuth.prototype.deParam = function(string) {
    var arr = string.split('&');
    var data = {};

    for(var i = 0; i < arr.length; i++) {
        var item = arr[i].split('=');

        // '' value
        item[1] = item[1] || '';

        // check if the key already exists
        // this can occur if the QS part of the url contains duplicate keys like this: ?formkey=formvalue1&formkey=formvalue2
        if (data[item[0]]){
          // the key exists already
          if (!Array.isArray(data[item[0]])) {
            // replace the value with an array containing the already present value
            data[item[0]] = [data[item[0]]];
          }
          // and add the new found value to it
          data[item[0]].push(decodeURIComponent(item[1]));
        } else {
          // it doesn't exist, just put the found value in the data object
          data[item[0]] = decodeURIComponent(item[1]);
        }
    }

    return data;
};

/**
 * Get data from url
 * @param  {String} url
 * @return {Object}
 */
OAuth.prototype.deParamUrl = function(url) {
    var tmp = url.split('?');

    if (tmp.length === 1)
        return {};

    return this.deParam(tmp[1]);
};

/**
 * Percent Encode
 * @param  {String} str
 * @return {String} percent encoded string
 */
OAuth.prototype.percentEncode = function(str) {
    return encodeURIComponent(str)
        .replace(/\!/g, "%21")
        .replace(/\*/g, "%2A")
        .replace(/\'/g, "%27")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29");
};

/**
 * Percent Encode Object
 * @param  {Object} data
 * @return {Object} percent encoded data
 */
OAuth.prototype.percentEncodeData = function(data) {
    var result = {};

    for(var key in data) {
        var value = data[key];
        // check if the value is an array
        if (value && Array.isArray(value)){
          var newValue = [];
          // percentEncode every value
          value.forEach((function(val){
            newValue.push(this.percentEncode(val));
          }).bind(this));
          value = newValue;
        } else {
          value = this.percentEncode(value);
        }
        result[this.percentEncode(key)] = value;
    }

    return result;
};

/**
 * Get OAuth data as Header
 * @param  {Object} oauth_data
 * @return {String} Header data key - value
 */
OAuth.prototype.toHeader = function(oauth_data) {
    var sorted = this.sortObject(oauth_data);

    var header_value = 'OAuth ';

    if (this.realm) {
        header_value += 'realm="' + this.realm + '"' + this.parameter_seperator;
    }

    for(var i = 0; i < sorted.length; i++) {
        if (sorted[i].key.indexOf('oauth_') !== 0)
            continue;

        header_value += this.percentEncode(sorted[i].key) + '="' + this.percentEncode(sorted[i].value) + '"' + this.parameter_seperator;
    }

    return {
        Authorization: header_value.substr(0, header_value.length - this.parameter_seperator.length) //cut the last chars
    };
};

/**
 * Create a random word characters string with input length
 * @return {String} a random word characters string
 */
OAuth.prototype.getNonce = function() {
    var word_characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';

    for(var i = 0; i < this.nonce_length; i++) {
        result += word_characters[parseInt(Math.random() * word_characters.length, 10)];
    }

    return result;
};

/**
 * Get Current Unix TimeStamp
 * @return {Int} current unix timestamp
 */
OAuth.prototype.getTimeStamp = function() {
    return parseInt(new Date().getTime()/1000, 10);
};

////////////////////// HELPER FUNCTIONS //////////////////////

/**
 * Merge object
 * @param  {Object} obj1
 * @param  {Object} obj2
 * @return {Object}
 */
OAuth.prototype.mergeObject = function(obj1, obj2) {
    obj1 = obj1 || {};
    obj2 = obj2 || {};

    var merged_obj = obj1;
    for(var key in obj2) {
        merged_obj[key] = obj2[key];
    }
    return merged_obj;
};

/**
 * Sort object by key
 * @param  {Object} data
 * @return {Array} sorted array
 */
OAuth.prototype.sortObject = function(data) {
    var keys = Object.keys(data);
    var result = [];

    keys.sort();

    for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        result.push({
            key: key,
            value: data[key],
        });
    }

    return result;
};


/***/ }),

/***/ "./aliases.js":
/*!********************!*\
  !*** ./aliases.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Provide a trackingId and retrieve aliases associated with it.
 * Be able to search within aliases for associated trackers.
 *
 * A tracker often has to be associated with an external system in a way that is
 * neither part of the reported state of the device or the desired state – attaching
 * a tracker to a particular engine part or palette; assigning a human-readable name;
 * synchronizing with an external asset management system. This service allows the
 * association of arbitrary type-externalId pairs with a trackingId as well as the ability to
 * search across those type-externalId pairs to find the containing trackingIds. External Id
 * and type pair must be unique within an account.
 *
 */
var Aliases = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - General utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   * @param {function(trackingId: string): Object} utils.normaliseId - Allow methods to be called using trackingId or
   * externalId/appId object
   */
  function Aliases(utils) {
    _classCallCheck(this, Aliases);

    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string} generate URL for HERE Tracking
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */

    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */

    this.fetch = utils.fetch;
    /**
     * Allow methods to be called using trackingId or externalId/appId object
     * @type {function(trackingId: string): Object}
     */

    this.normaliseId = utils.normaliseId;
  }
  /**
   * Gets all aliases of this device.
   *
   * The identifier can be a trackingId or an object with externalId and appId
   *
   * Example:
   *
   *.   "HERE-1234-1234-1234"
   *
   * or:
   *
   *.   {
   *.     "externalId": '123-abc',
   *.     "appId": "a1b2c3"
   *.   }
   *
   * @param {string} idOrObject - can be a trackingId or an externalId/appId object
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {number} options.count - Number of results per page (maximum 1000, default 1000).
   * @param {string} options.pageToken - Token to request 'next page' when paging.
   * @param {string} options.type - Type of an externalId (alias).
   * @returns {Object} Provides all aliases in a JSON object
   * @throws {Error} When an HTTP error has occurred
   */


  _createClass(Aliases, [{
    key: "get",
    value: function get(idOrObject, _ref) {
      var _this = this;

      var token = _ref.token,
          count = _ref.count,
          pageToken = _ref.pageToken,
          type = _ref.type;
      return this.validate({
        token: token,
        idOrObject: idOrObject
      }, ['token', 'idOrObject']).then(function () {
        var _this$normaliseId = _this.normaliseId(idOrObject),
            trackingId = _this$normaliseId.trackingId,
            queryParameters = _this$normaliseId.queryParameters;

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        if (type) {
          queryParameters.type = type;
        }

        var url = _this.url('aliases', 'v2', trackingId, queryParameters);

        return _this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Deletes all aliases of this device.
     *
     * @param {string} idOrObject - can be a trackingId or an externalId/appId object
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Provides all aliases in a JSON object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "delete",
    value: function _delete(idOrObject, _ref2) {
      var _this2 = this;

      var token = _ref2.token;
      return this.validate({
        token: token,
        idOrObject: idOrObject
      }, ['token', 'idOrObject']).then(function () {
        var _this2$normaliseId = _this2.normaliseId(idOrObject),
            trackingId = _this2$normaliseId.trackingId,
            queryParameters = _this2$normaliseId.queryParameters;

        var url = _this2.url('aliases', 'v2', trackingId, queryParameters);

        return _this2.fetch(url, {
          method: 'delete',
          headers: new Headers({
            'x-confirm': 'true',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Gets all aliases of all devices.
     *
     * @param {Object} options - Object containing request options
     * @param {string} options.type - Type of an externalId (alias)
     * @param {string} options.pageToken - Token to request 'next page' when paging
     * @param {string} options.token - Valid user access token
     * @param {number} options.count - The number of items to return per page (maximum 100, default 100)
     * @param {number} options.after - Milliseconds elapsed since 1 January 1970 00:00:00 UTC
     * The accepted range is from 0 to the current time
     * @returns {Object} Provides all aliases in a JSON object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getAll",
    value: function getAll(_ref3) {
      var _this3 = this;

      var type = _ref3.type,
          pageToken = _ref3.pageToken,
          count = _ref3.count,
          after = _ref3.after,
          token = _ref3.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        var queryParameters = {};
        if (type) queryParameters.type = type;
        if (pageToken) queryParameters.pageToken = pageToken;
        if (count) queryParameters.count = count;
        if (after) queryParameters.after = after;

        var url = _this3.url('aliases', 'v2', queryParameters);

        return _this3.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Gets all aliases of a particular type for this device.
     *
     * @param {string} idOrObject - can be a trackingId or an externalId/appId object
     * @param {string} type - type of alias to retrieve
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {number} options.count - Number of results per page (maximum 1000, default 1000).
     * @param {string} options.pageToken - Token to request 'next page' when paging.
     * @returns {Object} Provides all aliases in a JSON object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getByType",
    value: function getByType(idOrObject, type, _ref4) {
      var _this4 = this;

      var token = _ref4.token,
          count = _ref4.count,
          pageToken = _ref4.pageToken;
      return this.validate({
        token: token,
        idOrObject: idOrObject,
        type: type
      }, ['token', 'idOrObject', 'type']).then(function () {
        var _this4$normaliseId = _this4.normaliseId(idOrObject),
            trackingId = _this4$normaliseId.trackingId,
            queryParameters = _this4$normaliseId.queryParameters;

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        var url = _this4.url('aliases', 'v2', trackingId, type, queryParameters);

        return _this4.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Deletes all aliases of a type
     *
     * @param {string} idOrObject - can be a trackingId or an externalId/appId object
     * @param {string} type - type of aliases to delete
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Empty response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "deleteByType",
    value: function deleteByType(idOrObject, type, _ref5) {
      var _this5 = this;

      var token = _ref5.token;
      return this.validate({
        token: token,
        idOrObject: idOrObject,
        type: type
      }, ['token', 'idOrObject', 'type']).then(function () {
        var _this5$normaliseId = _this5.normaliseId(idOrObject),
            trackingId = _this5$normaliseId.trackingId;

        var url = _this5.url('aliases', 'v2', trackingId, type);

        return _this5.fetch(url, {
          method: 'delete',
          credentials: 'include',
          headers: new Headers({
            'x-confirm': 'true',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Gets the HERE trackingId of a device given its externalId and externalId type
     *
     * @param {string} type - type of alias
     * @param {string} externalId - external ID to look up
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} A JSON object containing the trackingId
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getTrackingId",
    value: function getTrackingId(type, externalId, _ref6) {
      var _this6 = this;

      var token = _ref6.token;
      return this.validate({
        type: type,
        externalId: externalId
      }, ['token', 'type', 'externalId']).then(function () {
        var queryParameters = {
          type: type,
          externalId: externalId
        };

        var url = _this6.url('aliases', 'v2', 'trackingId', queryParameters);

        return _this6.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Adds an alias for the trackingId. Must be unique within account.
     *
     * @param {string} idOrObject - can be a trackingId or an externalId/appId object
     * @param {string} type - type of alias
     * @param {string} externalId - external ID to add
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Empty response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "add",
    value: function add(idOrObject, type, externalId, _ref7) {
      var _this7 = this;

      var token = _ref7.token;
      return this.validate({
        idOrObject: idOrObject,
        type: type,
        externalId: externalId
      }, ['idOrObject', 'token', 'type', 'externalId']).then(function () {
        var _this7$normaliseId = _this7.normaliseId(idOrObject),
            trackingId = _this7$normaliseId.trackingId,
            queryParameters = _this7$normaliseId.queryParameters;

        var url = _this7.url('aliases', 'v2', trackingId, type, externalId, queryParameters);

        return _this7.fetch(url, {
          method: 'put',
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Deletes a specific alias for the trackingId.
     *
     * @param {string} idOrObject - can be a trackingId or an externalId/appId object
     * @param {string} type - type of alias
     * @param {string} externalId - external ID to add
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Empty response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "deleteOne",
    value: function deleteOne(idOrObject, type, externalId, _ref8) {
      var _this8 = this;

      var token = _ref8.token;
      return this.validate({
        idOrObject: idOrObject,
        type: type,
        externalId: externalId
      }, ['idOrObject', 'token', 'type', 'externalId']).then(function () {
        var _this8$normaliseId = _this8.normaliseId(idOrObject),
            trackingId = _this8$normaliseId.trackingId,
            queryParameters = _this8$normaliseId.queryParameters;

        var url = _this8.url('aliases', 'v2', trackingId, type, externalId, queryParameters);

        return _this8.fetch(url, {
          method: 'delete',
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
  }]);

  return Aliases;
}();

module.exports = Aliases;

/***/ }),

/***/ "./associations.js":
/*!*************************!*\
  !*** ./associations.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Manage associations between devices and other entities
 *
 */
var Associations = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - General utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   * @param {function(trackingId: string): Object} utils.normaliseId - Allow methods to be called using trackingId or
   * externalId/appId object
   */
  function Associations(utils) {
    _classCallCheck(this, Associations);

    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string} generate URL for HERE Tracking
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */

    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */

    this.fetch = utils.fetch;
  }
  /**
   * Associate a rule with a device
   *
   * @param {string} ruleId - ID of rule
   * @param {string} trackingId - ID of device
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Body of the transition response
   * @throws {Error} When an HTTP error has occurred
   */


  _createClass(Associations, [{
    key: "associateRuleWithDevice",
    value: function associateRuleWithDevice(ruleId, trackingId, _ref) {
      var _this = this;

      var token = _ref.token;
      return this.validate({
        ruleId: ruleId,
        trackingId: trackingId,
        token: token
      }, ['ruleId', 'trackingId', 'token']).then(function () {
        return _this.fetch(_this.url('associations', 'v3', trackingId, 'sensors', ruleId), {
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Remove a rule/device association
     *
     * @param {string} ruleId - ID of rule
     * @param {string} trackingId - ID of device
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body of the transition response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "removeRuleFromDevice",
    value: function removeRuleFromDevice(ruleId, trackingId, _ref2) {
      var _this2 = this;

      var token = _ref2.token;
      return this.validate({
        ruleId: ruleId,
        trackingId: trackingId,
        token: token
      }, ['ruleId', 'trackingId', 'token']).then(function () {
        return _this2.fetch(_this2.url('associations', 'v3', trackingId, 'sensors', ruleId), {
          method: 'delete',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * List the rules associated to this device.
     *
     * @param {string} trackingId - ID of tracker
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {number} [options.count] - Number of rules returned per page (default 100)
     * @param {string} [options.pageToken] - Page token used for retrieving next page
     * @returns {Object} Body of the rules response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "listDeviceRules",
    value: function listDeviceRules(trackingId, _ref3) {
      var _this3 = this;

      var count = _ref3.count,
          pageToken = _ref3.pageToken,
          token = _ref3.token;
      return this.validate({
        trackingId: trackingId,
        token: token
      }, ['trackingId', 'token']).then(function () {
        var queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        var url = _this3.url('associations', 'v3', trackingId, 'sensors', queryParameters);

        return _this3.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * List the rules associated to this device.
     *
     * @param {string} ruleId - ID of the rule we want information about
     * @param {Object} options - Object containing request options
     * @param {number} [options.count] - Number of rules returned per page (default 100)
     * @param {string} [options.pageToken] - Page token used for retrieving next page
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body of the rules response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "listRuleDevices",
    value: function listRuleDevices(ruleId, _ref4) {
      var _this4 = this;

      var count = _ref4.count,
          pageToken = _ref4.pageToken,
          token = _ref4.token;
      return this.validate({
        ruleId: ruleId,
        token: token
      }, ['ruleId', 'token']).then(function () {
        var queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        var url = _this4.url('associations', 'v3', 'sensors', ruleId, queryParameters);

        return _this4.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
  }]);

  return Associations;
}();

module.exports = Associations;

/***/ }),

/***/ "./device.js":
/*!*******************!*\
  !*** ./device.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */
var OAuth = __webpack_require__(/*! oauth-1.0a */ "../node_modules/oauth-1.0a/oauth-1.0a.js");

var CryptoJS = __webpack_require__(/*! crypto-js */ "../node_modules/crypto-js/index.js");
/**
 * Device sender interface
 *
 * This class handles authenticating device credentials and sending telemetry to
 * HERE Tracking. It can be used to create a virtual device.
 *
 * For more information, see:
 * https://developer.here.com/documentation/tracking/topics/devices.html
 *
 */


var Device = /*#__PURE__*/function () {
  /**
   * Create a virtual device
   *
   * @param {Object} utils - General utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   */
  function Device(utils) {
    _classCallCheck(this, Device);

    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string} generate URL for HERE Tracking
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */

    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */

    this.fetch = utils.fetch;
  }
  /**
   * Generate a one-time string for the OAuth 1.0 login
   *
   * *NOTE: The generated nonce will be different every time this method is called
   *
   * @example
   * hereTracking.device.generateNonce(6)
   * > a9fWF4
   *
   * @param {number} length - Desired length of the nonce
   * @returns {string} Generated nonce
   */


  _createClass(Device, [{
    key: "login",

    /**
     * Log in the device
     *
     * Request a device token from HERE Tracking
     *
     * @example
     * hereTracking.device.login('878be51a-6e27-4484-811e-example', '39d-f44e8c56f515/example3is-F')
     * > { token: 'h1.1234...'}
     *
     * @param {string} deviceId - Valid device ID
     * @param {string} deviceSecret - Valid device secret
     * @returns {Object} Valid accessToken for this device
     * @throws {Error} When an HTTP error has occurred
     */
    value: function login(deviceId, deviceSecret) {
      var _this = this;

      return this.validate({
        deviceId: deviceId,
        deviceSecret: deviceSecret
      }, ['deviceId', 'deviceSecret']).then(function () {
        /* eslint-disable camelcase */
        var oauth = OAuth({
          consumer: {
            key: deviceId,
            secret: deviceSecret
          },
          parameter_seperator: ',',
          hash_function: function hash_function(baseString, key) {
            return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(baseString, key));
          }
        }); // request token from device-http

        var oauthParameters = {
          oauth_consumer_key: deviceId,
          oauth_nonce: Device.generateNonce(6),
          oauth_timestamp: Math.floor(+new Date() / 1E3),
          oauth_signature_method: 'HMAC-SHA256',
          oauth_version: '1.0'
        };
        var oauthSignature = oauth.authorize({
          url: _this.url('v2', 'token'),
          method: 'POST',
          data: oauthParameters
        });
        return _this.fetch(_this.url('v2', 'token'), {
          method: 'post',
          headers: new Headers(oauth.toHeader(oauthSignature))
        });
        /* eslint-enable camelcase */
      });
    }
    /**
     * Send telemetry
     *
     * Position Object example (see documentation for more detail)
     *
     *```
     *    {
     *      "lat": 55.9535,
     *      "lng": -3.1939,
     *      "alt": 81
     *    }
     *```
     *
     * @example
     * hereTracking.device.send({lat: 55.9535,lng: -3.1939,alt: 81}, { token: 'h1.1234...'})
     *
     * @param {Object} telemetry - Device telemetry
     * @param {Object} [telemetry.position] - Standard position object
     * @param {Object} [telemetry.payload] - Telemetry payload (arbitrary JSON)
     * @param {Object} [telemetry.scan] - WiFi Scan payload
     * @param {Object} [telemetry.timestamp] - Time of sample
     * @param {Object} requestOptions - Object containing method options
     * @param {string} requestoptions.token - Valid device token
     * @param {string} [requestOptions.deviceId] - Valid device ID. If not provided,
     * the deviceId from the last `.login()` call is used
     *
     * @returns {Object} Successful telemetry response object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "send",
    value: function send(telemetry, _ref) {
      var _this2 = this;

      var token = _ref.token,
          deviceId = _ref.deviceId;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        var body = Array.isArray(telemetry) ? telemetry : [telemetry];
        return _this2.fetch(_this2.url('device-http', 'v2'), {
          method: 'post',
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(body)
        });
      });
    }
  }], [{
    key: "generateNonce",
    value: function generateNonce(length) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    }
  }]);

  return Device;
}();

module.exports = Device;

/***/ }),

/***/ "./devices.js":
/*!********************!*\
  !*** ./devices.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Device management interfaces.
 *
 * This class handles device claiming and unclaiming as well as mapping deviceId to trackingID and vice versa.
 *
 */
var Devices = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - General utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   */
  function Devices(utils) {
    _classCallCheck(this, Devices);

    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string} Generate the URL for HERE Tracking
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */

    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */

    this.fetch = utils.fetch;
  }
  /**
   * Claim a device. Bind a new device to a user.
   * /registry/v2/devices/{deviceId}
   *
   * @example
   * hereTracking.devices.claim('c0ba6127-e3ba-4518-ada1-ef4274836bd1', { token: 'h1.123...' })
   * {
   *   "trackingId": "HERE-3e8b0d78-2fef-4644-a214-49c9c332637c"
   * }
   *
   * @param {string} deviceId - UUID of the device
   * @param {Object} options - Object containing method options
   * @param {string} options.token - Valid user access token
   * @param {string} [options.ownerAppId] - Application identifier which
   * specifies device owner's application to which the device is associated with
   * @returns {Object} Body of the claim response. Contains the new trackingId
   * @throws {Error} When an HTTP error has occurred
   */


  _createClass(Devices, [{
    key: "claim",
    value: function claim(deviceId, _ref) {
      var _this = this;

      var token = _ref.token,
          ownerAppId = _ref.ownerAppId;
      var body;

      if (ownerAppId) {
        body = JSON.stringify({
          ownerAppId: ownerAppId
        });
      }

      return this.validate({
        token: token,
        deviceId: deviceId
      }, ['token', 'deviceId']).then(function () {
        return _this.fetch(_this.url('registry', 'v2', 'devices', deviceId), {
          method: 'put',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token),
            'Content-Type': 'application/json'
          }),
          body: body
        });
      });
    }
    /**
     * Unclaim a device. Unbind a trackingId from a user.
     * /registry/v2/{trackingId}
     *
     * @example
     * hereTracking.devices.unclaim('HERE-3e8b0d78-2fef-4644-a214-49c9c332637c', { token: 'h1.123...' })
     *
     * @param {string} trackingId - Tracking ID of the device
     * @param {Object} options - Object containing method options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body of the unclaim response.
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "unclaim",
    value: function unclaim(trackingId, _ref2) {
      var _this2 = this;

      var token = _ref2.token;
      return this.validate({
        token: token,
        trackingId: trackingId
      }, ['token', 'trackingId']).then(function () {
        return _this2.fetch(_this2.url('registry', 'v2', trackingId), {
          method: 'delete',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Get Tracking ID given a Device ID
     * /registry/v2/devices/{deviceId}
     *
     * @example
     * hereTracking.devices.trackingId('c0ba6127-e3ba-4518-ada1-ef4274836bd1', { token: 'h1.123...' })
     * {
     *   "trackingId": "HERE-3e8b0d78-2fef-4644-a214-49c9c332637c"
     * }
     *
     * @param {string} deviceId - Device ID of the device
     * @param {Object} options - Object containing method options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body containing the Tracking ID
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "trackingId",
    value: function trackingId(deviceId, _ref3) {
      var _this3 = this;

      var token = _ref3.token;
      return this.validate({
        deviceId: deviceId,
        token: token
      }, ['deviceId', 'token']).then(function () {
        return _this3.fetch(_this3.url('registry', 'v2', 'devices', deviceId), {
          method: 'get',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Get Device ID given a Tracking ID
     * /registry/v2/{trackingId}
     *
     * @example
     * hereTracking.devices.deviceId('HERE-3e8b0d78-2fef-4644-a214-49c9c332637c', { token: 'h1.123...' })
     * {
     *   "deviceId": "c0ba6127-e3ba-4518-ada1-ef4274836bd1"
     * }
     *
     * @param {string} trackingId - Tracking ID of the device
     * @param {Object} options - Object containing method options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body containing the Tracking ID
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "deviceId",
    value: function deviceId(trackingId, _ref4) {
      var _this4 = this;

      var token = _ref4.token;
      return this.validate({
        trackingId: trackingId,
        token: token
      }, ['trackingId', 'token']).then(function () {
        return _this4.fetch(_this4.url('registry', 'v2', trackingId), {
          method: 'get',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Get the geofences associated with a device.
     *
     * @param {string} trackingId - Tracking ID of the device
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {string} [options.pageToken] - Page token used for retrieving next page
     * @param {number} [options.count] - Number of geofences returned per page
     * @returns {Object} Body of the geofence response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getGeofences",
    value: function getGeofences(trackingId, _ref5) {
      var _this5 = this;

      var token = _ref5.token,
          count = _ref5.count,
          pageToken = _ref5.pageToken;
      return this.validate({
        trackingId: trackingId,
        token: token
      }, ['trackingId', 'token']).then(function () {
        var queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        var url = _this5.url('device-associations', 'v2', trackingId, 'geofences', queryParameters);

        return _this5.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
  }]);

  return Devices;
}();

module.exports = Devices;

/***/ }),

/***/ "./events.js":
/*!*******************!*\
  !*** ./events.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * View details about events created by devices and rules
 *
 * This class handles device claiming and unclaiming as well as mapping deviceId to trackingID and vice versa.
 *
 */
var Events = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - General utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   */
  function Events(utils) {
    _classCallCheck(this, Events);

    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string} Generate the URL for HERE Tracking
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */

    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */

    this.fetch = utils.fetch;
  }
  /**
   * List all events available to the user.
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {number} [options.count] - Number of rules returned per page (default 100)
   * @param {string} [options.pageToken] - Page token used for retrieving next page
   * @returns {Object} Body of the rules response
   * @throws {Error} When an HTTP error has occurred
   */


  _createClass(Events, [{
    key: "list",
    value: function list(_ref) {
      var _this = this;

      var count = _ref.count,
          pageToken = _ref.pageToken,
          token = _ref.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        var queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        var url = _this.url('events', 'v3', queryParameters);

        return _this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Get events generated by a specific device
     *
     * @param {string} trackingId - ID of tracker
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {number} [options.count] - Number of rules returned per page (default 100)
     * @param {string} [options.pageToken] - Page token used for retrieving next page
     * @returns {Object} Body of the rules response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getByDevice",
    value: function getByDevice(trackingId, _ref2) {
      var _this2 = this;

      var count = _ref2.count,
          pageToken = _ref2.pageToken,
          token = _ref2.token;
      return this.validate({
        trackingId: trackingId,
        token: token
      }, ['trackingId', 'token']).then(function () {
        var queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        var url = _this2.url('events', 'v3', trackingId, queryParameters);

        return _this2.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Get all events generated by a specific rule
     *
     * @param {string} ruleId - ID of rule
     * @param {Object} options - Object containing request options
     * @param {number} [options.count] - Number of rules returned per page (default 100)
     * @param {string} [options.pageToken] - Page token used for retrieving next page
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body of the rules response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getByRule",
    value: function getByRule(ruleId, _ref3) {
      var _this3 = this;

      var count = _ref3.count,
          pageToken = _ref3.pageToken,
          token = _ref3.token;
      return this.validate({
        ruleId: ruleId,
        token: token
      }, ['ruleId', 'token']).then(function () {
        var queryParameters = {
          ruleId: ruleId
        };

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        var url = _this3.url('events', 'v3', queryParameters);

        return _this3.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Get details of a specific event
     *
     * @param {string} trackingId - ID of tracker
     * @param {string} ruleId - ID of rule
     * @param {string} timestamp - Time the event happened
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {number} [options.count] - Number of rules returned per page (default 100)
     * @param {string} [options.pageToken] - Page token used for retrieving next page
     * @returns {Object} Body of the rules response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getDetails",
    value: function getDetails(trackingId, ruleId, timestamp, _ref4) {
      var _this4 = this;

      var count = _ref4.count,
          pageToken = _ref4.pageToken,
          token = _ref4.token;
      return this.validate({
        trackingId: trackingId,
        ruleId: ruleId,
        timestamp: timestamp,
        token: token
      }, ['trackingId', 'ruleId', 'timestamp', 'token']).then(function () {
        var queryParameters = {
          trackingId: trackingId,
          ruleId: ruleId,
          timestamp: timestamp
        };

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        var url = _this4.url('events', 'v3', queryParameters);

        return _this4.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
  }]);

  return Events;
}();

module.exports = Events;

/***/ }),

/***/ "./geofences.js":
/*!**********************!*\
  !*** ./geofences.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 */
var atLeastOneOf = ['definition', 'name', 'description'];
/**
 * Create, modify and delete geofences.
 *
 * This class also handles creating associations between geofences and devices.
 *
 * For more information, see:
 * https://developer.here.com/documentation/tracking/topics/geofences.html
 *
 */

var Geofences = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - General utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   */
  function Geofences(utils) {
    _classCallCheck(this, Geofences);

    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string} generate URL for HERE Tracking
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */

    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */

    this.fetch = utils.fetch;
  }
  /**
   * List the geofences available to the user.
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {number} [options.count] - Number of geofences returned per page (default 100)
   * @param {string} [options.pageToken] - Page token used for retrieving next page
   * @returns {Object} Body of the geofence response
   * @throws {Error} When an HTTP error has occurred
   */


  _createClass(Geofences, [{
    key: "list",
    value: function list(_ref) {
      var _this = this;

      var count = _ref.count,
          pageToken = _ref.pageToken,
          token = _ref.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        var queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        var url = _this.url('geofences', 'v2', queryParameters);

        return _this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Retrieve details about a geofence.
     *
     * @param {string} geofenceId - ID of geofence to retrieve
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body of the geofence response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "get",
    value: function get(geofenceId, _ref2) {
      var _this2 = this;

      var token = _ref2.token;
      return this.validate({
        token: token,
        geofenceId: geofenceId
      }, ['token', 'geofenceId']).then(function () {
        var url = _this2.url('geofences', 'v2', geofenceId);

        return _this2.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Create a new geofence associated with a user
     *
     * @param {Object} geofence - definition of the geofence
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body of the geofence response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "create",
    value: function create(geofence, _ref3) {
      var _this3 = this;

      var token = _ref3.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        var url = _this3.url('geofences', 'v2');

        var fields = Object.keys(geofence);

        if (fields.indexOf('type') < 0) {
          return Promise.reject(new Error('No geofence type specified'));
        }

        if (fields.indexOf('definition') < 0) {
          return Promise.reject(new Error('No geofence shape definition specified'));
        }

        return _this3.fetch(url, {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(geofence)
        });
      });
    }
    /**
     * Update a geofence
     *
     * @param {Object} geofence - Definition of the geofence
     * @param {Object} geofence.id - ID of the geofence
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body of the geofence response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "update",
    value: function update(geofence, _ref4) {
      var _this4 = this;

      var token = _ref4.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        return _this4.validate(geofence, ['id']);
      }).then(function () {
        var url = _this4.url('geofences', 'v2', geofence.id);

        delete geofence.id;
        var fields = Object.keys(geofence);
        var missing = atLeastOneOf.filter(function (x) {
          return fields.indexOf(x) < 0;
        });

        if (missing.length === atLeastOneOf.length) {
          return Promise.reject(new Error("Geofence update requires at least one of:  ".concat(missing.join(', '))));
        }

        return _this4.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(geofence)
        });
      });
    }
    /**
     * Remove geofence
     *
     * @param {Object} geofenceId - ID of the geofence
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object}
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "remove",
    value: function remove(geofenceId, _ref5) {
      var _this5 = this;

      var token = _ref5.token;
      return this.validate({
        geofenceId: geofenceId,
        token: token
      }, ['token', 'geofenceId']).then(function () {
        return _this5.fetch(_this5.url('geofences', 'v2', geofenceId), {
          method: 'delete',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Remove all geofences.
     * This is a separate method so that it can't be called by accidentally
     * forgetting to pass geofenceId
     *
     * @param {boolean} really - Confirmation to delete all
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object}
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "removeAll",
    value: function removeAll(really, _ref6) {
      var _this6 = this;

      var token = _ref6.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        if (really !== true) {
          return Promise.reject(new Error('Confirmation required to delete all geofences.'));
        }

        var url = _this6.url('geofences', 'v2');

        return _this6.fetch(url, {
          method: 'delete',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token),
            'x-confirm': really
          })
        });
      });
    }
    /**
     * Get the devices associated with a geofence.
     *
     * @param {string} geofenceId - ID of the geofence
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {string} [options.pageToken] - Page token used for retrieving next page
     * @param {number} [options.count] - Number of devices returned per page
     * @returns {Object} Body of the device response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getDevices",
    value: function getDevices(geofenceId, _ref7) {
      var _this7 = this;

      var token = _ref7.token,
          count = _ref7.count,
          pageToken = _ref7.pageToken;
      return this.validate({
        geofenceId: geofenceId,
        token: token
      }, ['geofenceId', 'token']).then(function () {
        var queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        var url = _this7.url('geofence-associations', 'v2', geofenceId, 'devices', queryParameters);

        return _this7.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Add a device to a geofence
     *
     * @param {string} geofenceId - ID of geofence
     * @param {string} trackingId - ID of device to add
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body of the transition response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "addDevice",
    value: function addDevice(geofenceId, trackingId, _ref8) {
      var _this8 = this;

      var token = _ref8.token;
      return this.validate({
        geofenceId: geofenceId,
        trackingId: trackingId,
        token: token
      }, ['geofenceId', 'trackingId', 'token']).then(function () {
        return _this8.fetch(_this8.url('geofence-associations', 'v2', geofenceId, trackingId), {
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Remove a device from a geofence
     *
     * @param {string} geofenceId - ID of geofence
     * @param {string} trackingId - ID of device to remove
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body of the transition response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "removeDevice",
    value: function removeDevice(geofenceId, trackingId, _ref9) {
      var _this9 = this;

      var token = _ref9.token;
      return this.validate({
        geofenceId: geofenceId,
        trackingId: trackingId,
        token: token
      }, ['geofenceId', 'trackingId', 'token']).then(function () {
        return _this9.fetch(_this9.url('geofence-associations', 'v2', geofenceId, trackingId), {
          method: 'delete',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
  }]);

  return Geofences;
}();

module.exports = Geofences;

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */
var Geofences = __webpack_require__(/*! ./geofences */ "./geofences.js");

var Device = __webpack_require__(/*! ./device */ "./device.js");

var Devices = __webpack_require__(/*! ./devices */ "./devices.js");

var Vendor = __webpack_require__(/*! ./vendor */ "./vendor.js");

var Notifications = __webpack_require__(/*! ./notifications */ "./notifications.js");

var Shadows = __webpack_require__(/*! ./shadows */ "./shadows.js");

var Traces = __webpack_require__(/*! ./traces */ "./traces.js");

var Transitions = __webpack_require__(/*! ./transitions */ "./transitions.js");

var Journeys = __webpack_require__(/*! ./journeys */ "./journeys.js");

var Users = __webpack_require__(/*! ./users */ "./users.js");

var Aliases = __webpack_require__(/*! ./aliases */ "./aliases.js");

var Metadata = __webpack_require__(/*! ./metadata */ "./metadata.js");

var Events = __webpack_require__(/*! ./events */ "./events.js");

var Rules = __webpack_require__(/*! ./rules */ "./rules.js");

var Associations = __webpack_require__(/*! ./associations */ "./associations.js");

var Messages = __webpack_require__(/*! ./messages */ "./messages.js"); // Validation for correlationId


var v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
/**
 * HERETracking JS simplifies access to HERE Tracking.
 * It can be used to create management consoles, monitoring interfaces
 * and general device interfaces.
 *
 * It can also be used to create a virtual device.
 */

var HERETracking = /*#__PURE__*/function () {
  /**
   * Create an instance of HERETracking
   *
   * See https://developer.here.com/ for more details
   */
  function HERETracking() {
    var _this = this;

    _classCallCheck(this, HERETracking);

    this._hosts = {
      'cit': 'https://cit.tracking.api.here.com',
      'production': 'https://tracking.api.here.com'
    };
    this._name = 'HERETracking v2.2.1';
    this._environment = 'production';
    this._host = this._hosts[this._environment]; // If this is set, use it as a trace for all request

    this._correlationId = null; // If this is set, use it on all API calls

    this._projectId = null;
    var utils = {
      url: this.url.bind(this),
      validate: HERETracking.validate.bind(this),
      fetch: function (_fetch) {
        function fetch(_x) {
          return _fetch.apply(this, arguments);
        }

        fetch.toString = function () {
          return _fetch.toString();
        };

        return fetch;
      }(function (url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (_this._correlationId) {
          options.headers = options.headers || {};
          options.headers['X-Request-Id'] = _this._correlationId;
        }

        return fetch(url, options).then(HERETracking.handleErrors).then(function (response) {
          var contentType = response.headers.get('content-type');

          if (contentType) {
            if (contentType.indexOf('application/json') !== -1) {
              return response.json();
            }

            if (contentType.indexOf('text/plain') !== -1) {
              return response.text();
            }
          }

          return response;
        });
      }),
      normaliseId: HERETracking.normaliseId.bind(this)
    };
    /**
     * Create, modify and delete geofences: {@link Geofences}
     */

    this.geofences = new Geofences(utils);
    /**
     * Device sender interface: {@link Device}
     */

    this.device = new Device(utils);
    /**
     * Device management interfaces: {@link Devices}
     */

    this.devices = new Devices(utils);
    /**
     * Provision new devices.: {@link Vendor}
     */

    this.vendor = new Vendor(utils, this.devices.claim);
    /**
     * Register and unregister notification channels: {@link Notifications}
     */

    this.notifications = new Notifications(utils);
    /**
     * Access to device shadows: {@link Shadows}
     */

    this.shadows = new Shadows(utils);
    /**
     * Access to device geofence transitions: {@link Transitions}
     */

    this.transitions = new Transitions(utils);
    /**
     * Manage journey templates and instances: {@link Journeys}
     */

    this.journeys = new Journeys(utils);
    /**
     * Access to device traces: {@link Traces}
     */

    this.traces = new Traces(utils);
    /**
     * Log in users, list available devices: {@link Users}
     */

    this.users = new Users(utils);
    /**
     * Manage external IDs for devices: {@link Aliases}
     */

    this.aliases = new Aliases(utils);
    /**
     * Manage associated data for devices and geofences: {@link Metadata}
     */

    this.metadata = new Metadata(utils);
    /**
     * Create and manage sensor rules {@link Rules}
     */

    this.rules = new Rules(utils);
    /**
     * Manage sensor events {@link Events}
     */

    this.events = new Events(utils);
    /**
     * Manage associations between devices and rules {@link Associations}
     */

    this.associations = new Associations(utils);
  }
  /**
   * Return the name and version of this library
   * @returns {string} Name and version
   */


  _createClass(HERETracking, [{
    key: "url",

    /**
     * Generate a correctly formatted URL pointing to the
     * right environment.
     *
     * Can be called with:
     *
     *     url(servicename, version, path, segments)
     *
     * or
     *
     *     url(path)
     *
     * @param {...string} [args] Variable arguments list of path parts
     * @returns {string} Formatted HERE Tracking URL
     */
    value: function url() {
      var queryParams = {};

      if (this._projectId) {
        queryParams.projectId = this._projectId;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (_typeof(args[args.length - 1]) === 'object') {
        var params = args.pop(); // eslint-disable-next-line no-restricted-syntax

        for (var key in params) {
          queryParams[key] = params[key];
        }
      }

      var pathname = "/".concat(args.join('/'));

      if (pathname.match(/^\/\//)) {
        pathname = pathname.substr(1);
      }

      var query = HERETracking.serialize(queryParams);
      return "".concat(this._host).concat(pathname).concat(query ? "?".concat(query) : '');
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
    /**
     * Valid environments are 'cit', 'production'
     * @param {string} env - Environment name
     */

  }, {
    key: "environment",
    set: function set(env) {
      if (Object.keys(this._hosts).indexOf(env) > -1) {
        this._environment = env;
        this._host = this._hosts[env];
      }
    }
    /**
     * Allows setting a global correlationId for all requests
     * @param {string} id - valid UUID v4
     */
    ,

    /**
     * @returns {string} Specified environment name
     */
    get: function get() {
      return this._environment;
    }
    /**
     * @returns {string} Specified projectId name
     */

  }, {
    key: "correlationId",
    set: function set(id) {
      if (id.match(v4)) {
        this._correlationId = id;
      } else {
        throw new TypeError(Messages.v4);
      }
    }
  }, {
    key: "projectId",
    get: function get() {
      return this._projectId;
    }
    /**
     * Allows setting a global projectId for all requests
     * @param {string} id
     */
    ,
    set: function set(id) {
      this._projectId = id;
    }
  }], [{
    key: "serialize",
    value: function serialize(obj) {
      var str = [];
      Object.keys(obj).forEach(function (key) {
        str.push("".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(obj[key])));
      });
      return str.join('&');
    }
    /**
     * Handle HTTP Errors
     *
     * Throw when the HTTP response is not a good one.
     *
     * @param {Object} response result of a Fetch call
     * @returns {Object} A promise that resolves to the Response object of Fetch API
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "handleErrors",
    value: function handleErrors(response) {
      if (!response.ok) {
        return Promise.reject(response);
      }

      return response;
    }
    /**
     * Allow methods to be called using either trackingId
     * or an object containing externalId and appId
     * @param {string} trackingId - can be a trackingId or an externalId/appId object
     * @returns {Object} trackingId and queryParameter object
     */

  }, {
    key: "normaliseId",
    value: function normaliseId(trackingId) {
      var appId = trackingId.appId,
          externalId = trackingId.externalId;

      if (appId && externalId) {
        return {
          trackingId: externalId,
          queryParameters: {
            appId: appId
          }
        };
      }

      return {
        trackingId: trackingId,
        queryParameters: {}
      };
    }
    /**
     * Return consistent error messages
     *
     * @param {string} key Name of missing parameter
     * @returns {string} Error message
     */

  }, {
    key: "errorMessages",
    value: function errorMessages(key) {
      return Messages[key] || "Required parameter missing: ".concat(key);
    }
    /**
     * Determine missing parameters
     *
     * If a key is listed in requiredKeys but not available in
     * options, an error message is returned;
     *
     * @param {Object} options supplied parameters
     * @param {Array} requiredKeys List of required parameters
     * @returns {Array} Error messages for missing parameters
     */

  }, {
    key: "check",
    value: function check(options, requiredKeys) {
      return requiredKeys.map(function (key) {
        return !options[key] && key || key === 0;
      }).filter(Boolean).map(HERETracking.errorMessages);
    }
    /**
     * Resolve or reject based on missing parameters
     *
     * @param {Object} options Supplied parameters
     * @param {Array} keys List of required parameters
     * @returns {Promise}
     */

  }, {
    key: "validate",
    value: function validate(options, keys) {
      if (typeof keys === 'undefined' || keys.length === 0) {
        return Promise.resolve(true);
      }

      var errors = HERETracking.check(options, keys);

      if (errors.length > 0) {
        return Promise.reject(errors.map(Error));
      }

      return Promise.resolve(true);
    }
  }]);

  return HERETracking;
}();

module.exports = HERETracking;

/***/ }),

/***/ "./journeys.js":
/*!*********************!*\
  !*** ./journeys.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Create and manage journey templates.
 *
 */
var Templates = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - generate URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - wrap fetch and error handling
   */
  function Templates(utils) {
    _classCallCheck(this, Templates);

    this.url = utils.url;
    this.validate = utils.validate;
    this.fetch = utils.fetch;
  }
  /**
   * List the journey templates available to the user.
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @param {number} [options.pageSize] - max number of entries retrieved in the page
   * @param {number} [options.pageIndex] - index of the page to retrieve
   * @param {number} [options.likeName] - a search term to fetch template having this term matching parts or their names
   * @param {number} [options.name] - an exact name search for a template
   * @returns {Array} body of the journey templates response
   * @throws {Error} when an HTTP error has occurred
   */


  _createClass(Templates, [{
    key: "list",
    value: function list(_ref) {
      var _this = this;

      var pageSize = _ref.pageSize,
          pageIndex = _ref.pageIndex,
          likeName = _ref.likeName,
          name = _ref.name,
          token = _ref.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        var queryParameters = {};
        if (Number.isInteger(pageSize)) queryParameters.pageSize = pageSize;
        if (Number.isInteger(pageIndex)) queryParameters.pageIndex = pageIndex;
        if (typeof likeName === 'string') queryParameters.likeName = likeName;
        if (typeof name === 'string') queryParameters.name = name;

        var url = _this.url('journeys', 'v2', 'journeyTemplates', queryParameters);

        return _this.fetch(url, {
          method: 'get',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Get a specific journey template
     *
     * @param {string} templateId - ID of the journey template to retrieve
     * @param {Object} options - Object containing request options
     * @param {string} options.token - valid user access token
     * @param {number} [options.pageSize] - max number of entries retrieved in the page
     * @param {number} [options.pageIndex] - index of the page to retrieve
     * @param {number} [options.likeName] - a search term to fetch template having this term matching parts or their names
     * @param {number} [options.name] - an exact name search for a template
     * @returns {Array} body of the journey templates response
     * @throws {Error} when an HTTP error has occurred
     */

  }, {
    key: "get",
    value: function get(templateId, _ref2) {
      var _this2 = this;

      var token = _ref2.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        var url = _this2.url('journeys', 'v2', 'journeyTemplates', templateId);

        return _this2.fetch(url, {
          method: 'get',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Create a journey template
     *
     * @param {number} description - Human-readable description of the template
     * @param {number} checkpoints - Array of checkpoint objects in the order they should appear
     * @param {Object} templateOptions - Options relating to the management of the journey
     * @param {number} templateOptions.externalId - ID of of the template in the external system
     * @param {boolean} templateOptions.adhoc - ???
     * @param {Object} options - Object containing request options
     * @param {string} options.token - valid user access token
     * @returns {Object} body of the journey template response
     * @throws {Error} when an HTTP error has occurred
     */

  }, {
    key: "create",
    value: function create(description, checkpoints, _ref3, _ref4) {
      var _this3 = this;

      var externalId = _ref3.externalId,
          _ref3$adhoc = _ref3.adhoc,
          adhoc = _ref3$adhoc === void 0 ? false : _ref3$adhoc;
      var token = _ref4.token;
      return this.validate({
        description: description,
        checkpoints: checkpoints,
        token: token
      }, ['description', 'checkpoints', 'token']).then(function () {
        var body = {
          jorTempDesc: description,
          jorTempAdhoc: adhoc,
          checkpoints: checkpoints
        };

        if (externalId) {
          body.jorTempExtUid = externalId;
        }

        return _this3.fetch(_this3.url('journeys', 'v2', 'journeyTemplates'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(body)
        });
      });
    }
    /**
     * Create a journey template, checkpoints and checkpoint types via JSON upload
     *
     * @param {number} templateJson - Object describing all checkpoints, types and the full template
     * @param {Object} options - Object containing request options
     * @param {string} options.token - valid user access token
     * @returns {Object} body of the journey template response
     * @throws {Error} when an HTTP error has occurred
     */

  }, {
    key: "jsonCreate",
    value: function jsonCreate(templateJson, _ref5) {
      var _this4 = this;

      var token = _ref5.token;
      return this.validate({
        templateJson: templateJson,
        token: token
      }, ['templateJson', 'token']).then(function () {
        return _this4.fetch(_this4.url('journeys', 'v2', 'import', 'setup'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(templateJson)
        });
      });
    }
    /**
     * Delete journey template
     * @param {number} templateId - ID of the tempalte to delete
     * @param {Object} options - Object containing request options
     * @param {string} options.token - valid user access token
     * @returns {object} successful delete confirmation
     */

  }, {
    key: "delete",
    value: function _delete(templateId, _ref6) {
      var _this5 = this;

      var token = _ref6.token;
      return this.validate({
        templateId: templateId,
        token: token
      }, ['templateId', 'token']).then(function () {
        return _this5.fetch(_this5.url('journeys', 'v2', 'journeyTemplates', templateId), {
          method: 'delete',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
  }]);

  return Templates;
}();
/**
 * Create and manage journey instances.
 *
 */


var Instances = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - generate URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - wrap fetch and error handling
   */
  function Instances(utils) {
    _classCallCheck(this, Instances);

    this.url = utils.url;
    this.validate = utils.validate;
    this.fetch = utils.fetch;
  }
  /**
   * Retrieve details about a journey instance.
   *
   * @param {number} journeyId - ID of journey instance to retrieve
   * @param {Object} options - Object containing request options
   * @param {number} options.checkupTs - timestamp at which to evaluate the journey delays
   * @param {string} options.token - valid user access token
   * @param {string} [options.detailed] - required level of detail in response
   * @param {string} [options.checkupTs] - timestamp we want information about.
   * @returns {Object} body of the journey instance response
   * @throws {Error} when an HTTP error has occurred
   */


  _createClass(Instances, [{
    key: "get",
    value: function get(journeyId, _ref7) {
      var _this6 = this;

      var checkupTs = _ref7.checkupTs,
          detailed = _ref7.detailed,
          token = _ref7.token;
      return this.validate({
        token: token,
        journeyId: journeyId
      }, ['token', 'journeyId']).then(function () {
        var queryParameters = {};
        if (typeof detailed === 'string') queryParameters.detailed = detailed;
        if (Number.isInteger(checkupTs)) queryParameters.checkupTs = checkupTs;

        var url = _this6.url('journeys', 'v2', "".concat(journeyId), queryParameters);

        return _this6.fetch(url, {
          method: 'get',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * List the journey instances available to the user
     *
     * @param {Object} options - Object containing request options
     * @param {number} options.checkupTs - timestamp at which to evaluate the journey delays
     * @param {string} options.token - valid user access token
     * @param {string} options.detailed - required level of detail in response
     * @returns {Object} body of the journey instance response
     * @throws {Error} when an HTTP error has occurred
     */

  }, {
    key: "list",
    value: function list(_ref8) {
      var _this7 = this;

      var checkupTs = _ref8.checkupTs,
          detailed = _ref8.detailed,
          token = _ref8.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        var queryParameters = {};
        if (typeof detailed === 'string') queryParameters.detailed = detailed;
        if (Number.isInteger(checkupTs)) queryParameters.checkupTs = checkupTs;

        var url = _this7.url('journeys', 'v2', queryParameters);

        return _this7.fetch(url, {
          method: 'get',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Create a journey instance
     *
     * @param {number} templateId - ID of journey instance to retrieve
     * @param {number} trackingId - ID of the device
     * @param {number} externalId - ID of of the device in the external system
     * @param {Object} instanceOptions - Options relating to the management of the journey
     * @param {boolean} instanceOptions.controlled - Enable controlled journey transition mode
     * @param {boolean} instanceOptions.autostart - Start the journey when the first checkpoint is transitioned
     * @param {Object} options - Object containing request options
     * @param {string} options.token - valid user access token
     * @param {string} options.detailed - required level of detail in response
     * @returns {Object} body of the journey instance response
     * @throws {Error} when an HTTP error has occurred
     */

  }, {
    key: "create",
    value: function create(templateId, trackingId, externalId, _ref9, _ref10) {
      var _this8 = this;

      var _ref9$controlled = _ref9.controlled,
          controlled = _ref9$controlled === void 0 ? true : _ref9$controlled,
          _ref9$autoStart = _ref9.autoStart,
          autoStart = _ref9$autoStart === void 0 ? true : _ref9$autoStart;
      var token = _ref10.token;
      return this.validate({
        templateId: templateId,
        trackingId: trackingId,
        externalId: externalId,
        token: token
      }, ['templateId', 'trackingId', 'externalId', 'token']).then(function () {
        var body = {
          jorTempId: templateId,
          jorExtUid: externalId,
          trackerUid: trackingId,
          jorControlled: controlled,
          autoStart: autoStart
        };
        return _this8.fetch(_this8.url('journeys', 'v2'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(body)
        });
      });
    }
    /**
     * Create journey instance via JSON upload
     *
     * @param {number} instanceJson - Object describing all checkpoints, types and the full template
     * @param {Object} options - Object containing request options
     * @param {string} options.token - valid user access token
     * @returns {Object} body of the journey template response
     * @throws {Error} when an HTTP error has occurred
     */

  }, {
    key: "jsonCreate",
    value: function jsonCreate(instanceJson, _ref11) {
      var _this9 = this;

      var token = _ref11.token;
      return this.validate({
        instanceJson: instanceJson,
        token: token
      }, ['instanceJson', 'token']).then(function () {
        return _this9.fetch(_this9.url('journeys', 'v2', 'import', 'journeys'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(instanceJson)
        });
      });
    }
  }]);

  return Instances;
}();
/**
 * Create and manage journey statistics.
 *
 */


var Stats = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - generate URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - wrap fetch and error handling
   */
  function Stats(utils) {
    _classCallCheck(this, Stats);

    this.url = utils.url;
    this.validate = utils.validate;
    this.fetch = utils.fetch;
  }
  /**
   * Retrieve statistical totals.
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @param {number} options.checkupTs - the timestamp where the statistics are to be retrieved
   * @param {Array} options.templates - journey template IDs, for which transactions are to contribute
   * to the statistics
   * @param {Array} options.journeys - journey IDs, which are to contribute to the statistics
   * @param {Array} options.checkpoints - check point IDs, for which transactions are to contribute
   * in the statistics
   * @param {Array} options.checkpointTypes - checkpoint types, for which transactions are to
   * contribute to the statistics
   * @param {Array} options.assets - assets list, for which transactions are to contribute to the statistics
   * @param {number} options.statusId - the status ID of journey instances to contribute to the statistics
   * @param {number} options.fromTs - the minimum checkpoint event timestamp that may contribute to
   * the statistics
   * @param {number} options.toTs - the maximum checkpoint event timestamp that may contribute to
   * the statistics
   * @param {Array} options.ranges - array of time ranges to obtain counts within { fromTs: 9999, toTs: 9999 }
   * @returns {Object} body of the statistics response
   * @throws {Error} when an HTTP error has occurred
   */


  _createClass(Stats, [{
    key: "getOverallTotals",
    value: function getOverallTotals(_ref12) {
      var _this10 = this;

      var checkupTs = _ref12.checkupTs,
          templates = _ref12.templates,
          journeys = _ref12.journeys,
          checkpoints = _ref12.checkpoints,
          checkpointTypes = _ref12.checkpointTypes,
          assets = _ref12.assets,
          statusId = _ref12.statusId,
          fromTs = _ref12.fromTs,
          toTs = _ref12.toTs,
          ranges = _ref12.ranges,
          token = _ref12.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        var queryParameters = {};
        if (Number.isInteger(checkupTs)) queryParameters.checkupTs = checkupTs;
        if (Number.isInteger(statusId)) queryParameters.statusId = statusId;
        if (Number.isInteger(fromTs)) queryParameters.fromTs = fromTs;
        if (Number.isInteger(toTs)) queryParameters.toTs = toTs;
        var body = {};
        if (Array.isArray(templates) && templates.length) body.templates = templates;
        if (Array.isArray(journeys) && journeys.length) body.journeys = journeys;
        if (Array.isArray(checkpoints) && checkpoints.length) body.checkpoints = checkpoints;
        if (Array.isArray(checkpointTypes) && checkpointTypes.length) body.checkpointTypes = checkpointTypes;
        if (Array.isArray(assets) && assets.length) body.assets = assets;
        if (Array.isArray(ranges) && ranges.length) body.ranges = ranges;

        var url = _this10.url('journeys', 'v2', 'stats', 'overallTotals', queryParameters);

        return _this10.fetch(url, {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(body)
        });
      });
    }
    /**
     * Retrieve journeys that have delays in a specific delay range.
     *
     * @param {number} minDelayS - Minimum delay value for a journey instance to Retrieve
     * @param {number} maxDelayS - Maximum delay value for a journey instance to Retrieve
     * @param {Object} options - Object containing request options
     * @param {string} options.token - valid user access token
     * @param {number} options.checkupTs - the timestamp where the statistics are to be retrieved
     * @param {Array} options.templates - journey template IDs, for which transactions are to contribute
     * to the statistics
     * @param {Array} options.journeys - journey IDs, which are to contribute to the statistics
     * @param {Array} options.checkpoints - check point IDs, for which transactions are to contribute
     * in the statistics
     * @param {Array} options.checkpointTypes - checkpoint types, for which transactions are to
     * contribute to the statistics
     * @param {Array} options.assets - assets list, for which transactions are to contribute to the statistics
     * @param {number} options.statusId - the status ID of journey instances to contribute to the statistics
     * @param {number} options.fromTs - the minimum checkpoint event timestamp that may contribute to
     * the statistics
     * @param {number} options.toTs - the maximum checkpoint event timestamp that may contribute to
     * the statistics
     * @returns {Object} body of the journeys list response
     * @throws {Error} when an HTTP error has occurred
     */

  }, {
    key: "listJourneysByDelays",
    value: function listJourneysByDelays(minDelayS, maxDelayS, _ref13) {
      var _this11 = this;

      var checkupTs = _ref13.checkupTs,
          templates = _ref13.templates,
          journeys = _ref13.journeys,
          checkpoints = _ref13.checkpoints,
          checkpointTypes = _ref13.checkpointTypes,
          assets = _ref13.assets,
          statusId = _ref13.statusId,
          fromTs = _ref13.fromTs,
          toTs = _ref13.toTs,
          pageSize = _ref13.pageSize,
          pageIndex = _ref13.pageIndex,
          token = _ref13.token;

      if (!Number.isInteger(minDelayS) || !Number.isInteger(maxDelayS) || minDelayS > maxDelayS) {
        return Promise.reject(new Error('Invalid min/max delay values'));
      }

      return this.validate({
        token: token
      }, ['token']).then(function () {
        var queryParameters = {
          minDelayS: minDelayS,
          maxDelayS: maxDelayS
        };
        if (Number.isInteger(checkupTs)) queryParameters.checkupTs = checkupTs;
        if (Number.isInteger(statusId)) queryParameters.statusId = statusId;
        if (Number.isInteger(fromTs)) queryParameters.fromTs = fromTs;
        if (Number.isInteger(toTs)) queryParameters.toTs = toTs;
        if (Number.isInteger(pageSize)) queryParameters.pageSize = pageSize;
        if (Number.isInteger(pageIndex)) queryParameters.pageIndex = pageIndex;
        var body = {};
        if (Array.isArray(templates) && templates.length) body.templates = templates;
        if (Array.isArray(journeys) && journeys.length) body.journeys = journeys;
        if (Array.isArray(checkpoints) && checkpoints.length) body.checkpoints = checkpoints;
        if (Array.isArray(checkpointTypes) && checkpointTypes.length) body.checkpointTypes = checkpointTypes;
        if (Array.isArray(assets) && assets.length) body.assets = assets;

        var url = _this11.url('journeys', 'v2', 'stats', 'journeysDelays', queryParameters);

        return _this11.fetch(url, {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(body)
        });
      });
    }
  }]);

  return Stats;
}();
/**
 * Create and manage journey checkpoints.
 *
 */


var Checkpoints = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - generate URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - wrap fetch and error handling
   */
  function Checkpoints(utils) {
    _classCallCheck(this, Checkpoints);

    this.url = utils.url;
    this.validate = utils.validate;
    this.fetch = utils.fetch;
  }
  /**
   * List the checkpoints available to the user.
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - valid user access token
   * @param {number} [options.pageSize] - max number of entries retrieved in the page
   * @param {number} [options.pageIndex] - index of the page to retrieve
   * @param {number} [options.likeName] - a search term to fetch template having this term matching parts or their names
   * @param {number} [options.name] - an exact name search for a template
   * @returns {Array} body of the journey templates response
   * @throws {Error} when an HTTP error has occurred
   */


  _createClass(Checkpoints, [{
    key: "list",
    value: function list(_ref14) {
      var _this12 = this;

      var pageSize = _ref14.pageSize,
          pageIndex = _ref14.pageIndex,
          likeName = _ref14.likeName,
          name = _ref14.name,
          token = _ref14.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        var queryParameters = {};
        if (Number.isInteger(pageSize)) queryParameters.pageSize = pageSize;
        if (Number.isInteger(pageIndex)) queryParameters.pageIndex = pageIndex;
        if (typeof likeName === 'string') queryParameters.likeName = likeName;
        if (typeof name === 'string') queryParameters.name = name;

        var url = _this12.url('journeys', 'v2', 'checkpoints', queryParameters);

        return _this12.fetch(url, {
          method: 'get',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Get the checkpoint details
     *
     * @param {string} checkpointId - ID of checkpoint we want information about
     * @param {Object} options - Object containing request options
     * @param {string} options.token - valid user access token
     * @param {number} [options.pageSize] - max number of entries retrieved in the page
     * @param {number} [options.pageIndex] - index of the page to retrieve
     * @param {number} [options.likeName] - a search term to fetch template having this term matching parts or their names
     * @param {number} [options.name] - an exact name search for a template
     * @returns {Array} body of the journey templates response
     * @throws {Error} when an HTTP error has occurred
     */

  }, {
    key: "get",
    value: function get(checkpointId, _ref15) {
      var _this13 = this;

      var pageSize = _ref15.pageSize,
          pageIndex = _ref15.pageIndex,
          likeName = _ref15.likeName,
          name = _ref15.name,
          token = _ref15.token;
      return this.validate({
        token: token,
        checkpointId: checkpointId
      }, ['token', 'checkpointId']).then(function () {
        var url = _this13.url('journeys', 'v2', 'checkpoints', "".concat(checkpointId));

        return _this13.fetch(url, {
          method: 'get',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * List the checkpoint types available to the user.
     *
     * @param {Object} options - Object containing request options
     * @param {string} options.token - valid user access token
     * @param {number} [options.pageSize] - max number of entries retrieved in the page
     * @param {number} [options.pageIndex] - index of the page to retrieve
     * @param {number} [options.likeName] - a search term to fetch template having this term matching parts or their names
     * @param {number} [options.name] - an exact name search for a template
     * @returns {Array} body of the journey templates response
     * @throws {Error} when an HTTP error has occurred
     */

  }, {
    key: "listTypes",
    value: function listTypes(_ref16) {
      var _this14 = this;

      var pageSize = _ref16.pageSize,
          pageIndex = _ref16.pageIndex,
          likeName = _ref16.likeName,
          name = _ref16.name,
          token = _ref16.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        var queryParameters = {};
        if (Number.isInteger(pageSize)) queryParameters.pageSize = pageSize;
        if (Number.isInteger(pageIndex)) queryParameters.pageIndex = pageIndex;
        if (typeof likeName === 'string') queryParameters.likeName = likeName;
        if (typeof name === 'string') queryParameters.name = name;

        var url = _this14.url('journeys', 'v2', 'checkpointtypes', queryParameters);

        return _this14.fetch(url, {
          method: 'get',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Create checkpoints
     * @param {Array} checkpoints - list of checkpoints to create
     * @param {Object} options - Object containing request options
     * @param {string} options.token - valid user access token
     * @returns {Object} list of failed and succesful creations
     */

  }, {
    key: "create",
    value: function create(checkpoints, _ref17) {
      var _this15 = this;

      var token = _ref17.token;
      return this.validate({
        checkpoints: checkpoints,
        token: token
      }, ['checkpoints', 'token']).then(function () {
        var body = checkpoints.map(function (checkpoint) {
          var checkpointBody = {
            cpTypeId: checkpoint.type,
            cpDesc: checkpoint.description
          };

          if (checkpoint.externalId) {
            checkpointBody.cpExtUid = checkpoint.externalId;
          }

          if (checkpoint.externalIdType) {
            checkpointBody.cpExtUid = checkpoint.externalIdType;
          }

          if (checkpoint.info) {
            checkpointBody.infoObj = checkpoint.info;
          }

          return checkpointBody;
        });
        return _this15.fetch(_this15.url('journeys', 'v2', 'checkpoints'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify({
            checkpoints: body
          })
        });
      });
    }
    /**
     * Delete checkpoint
     * @param {number} checkpointId - ID of the checkpoint to delete
     * @param {Object} options - Object containing request options
     * @param {string} options.token - valid user access token
     * @returns {object} successful delete confirmation
     */

  }, {
    key: "delete",
    value: function _delete(checkpointId, _ref18) {
      var _this16 = this;

      var token = _ref18.token;
      return this.validate({
        checkpointId: checkpointId,
        token: token
      }, ['checkpointId', 'token']).then(function () {
        return _this16.fetch(_this16.url('journeys', 'v2', 'checkpoints', checkpointId), {
          method: 'delete',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Create checkpoint type
     * @param {String} name - Human-readable name of type to create
     * @param {String} externalId - reference to an external system ID
     * @param {Object} options - Object containing request options
     * @param {string} options.token - valid user access token
     * @returns {Object} confirmation of type creation
     */

  }, {
    key: "createType",
    value: function createType(name, externalId, _ref19) {
      var _this17 = this;

      var token = _ref19.token;
      return this.validate({
        name: name,
        externalId: externalId,
        token: token
      }, ['name', 'externalId', 'token']).then(function () {
        return _this17.fetch(_this17.url('journeys', 'v2', 'checkpointtypes'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify({
            cpTypeName: name,
            cpTypeExtUid: externalId
          })
        });
      });
    }
    /**
     * Delete checkpoint type
     * @param {String} typeId - ID of the checkpoint type to delete
     * @param {Object} options - Object containing request options
     * @param {string} options.token - valid user access token
     * @returns {Object} confirmation of type deletion
     */

  }, {
    key: "deleteType",
    value: function deleteType(typeId, _ref20) {
      var _this18 = this;

      var token = _ref20.token;
      return this.validate({
        typeId: typeId,
        token: token
      }, ['typeId', 'token']).then(function () {
        return _this18.fetch(_this18.url('journeys', 'v2', 'checkpointtypes', typeId), {
          method: 'delete',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
  }]);

  return Checkpoints;
}();
/**
 * Create and manage journeys.
 *
 */


var Journeys =
/**
 * @param {Object} utils - general utilities passed from main HERETracking
 * @param {function(varArgs: ...string): string} utils.url - generate URL for HERE Tracking
 * @param {function(options: Object, required: Array): Promise} utils.validate - check the supplied parameters
 * @param {function(url: string, options: Object): Object} utils.fetch - wrap fetch and error handling
 */
function Journeys(utils) {
  _classCallCheck(this, Journeys);

  this.templates = new Templates(utils);
  this.stats = new Stats(utils);
  this.instances = new Instances(utils);
  this.checkpoints = new Checkpoints(utils);
};

module.exports = Journeys;

/***/ }),

/***/ "./messages.js":
/*!*********************!*\
  !*** ./messages.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Strings for error messages
 *
 *  * token: 'No token supplied',
 *  * trackingId: 'No tracking ID specified',
 *  * userAccountId: 'No user account ID specified',
 *  * deviceId: 'No device ID specified',
 *  * deviceSecret: 'No device secret supplied',
 *  * n: 'Number n not specified',
 *  * appId: 'No App ID supplied',
 *  * givenName: 'No given name supplied',
 *  * familyName: 'No family name supplied',
 *  * email: 'No email supplied',
 *  * count: 'count (Number of devices) not specified',
 *  * vendorId: 'vendorId not specified',
 *  * requestId: 'requestId not specified',
 *  * geofence: 'No geofence definition provided',
 *  * geofenceId: 'No geofence ID specified'
 *
 */
var Messages = {
  token: 'No token supplied',
  trackingId: 'No tracking ID specified',
  idOrObject: 'No tracking ID or external ID/app ID object specified',
  userAccountId: 'No user account ID specified',
  deviceId: 'No device ID specified',
  deviceSecret: 'No device secret supplied',
  n: 'Number n not specified',
  appId: 'No App ID supplied',
  givenName: 'No given name supplied',
  familyName: 'No family name supplied',
  email: 'No email supplied',
  count: 'count (Number of devices) not specified',
  vendorId: 'vendorId not specified',
  requestId: 'requestId not specified',
  geofence: 'No geofence definition provided',
  geofenceId: 'No geofence ID specified',
  v4: 'Supplied ID is not a valid UUIDv4'
};
module.exports = Messages;

/***/ }),

/***/ "./metadata.js":
/*!*********************!*\
  !*** ./metadata.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Provide a trackingId or geofenceId and retrieve associated metadata.
 * Update meta information for your resource.
 *
 * A tracker or geofence often has to be associated with metadata;
 * adding descriptive information about it. This service allows the
 * association of arbitrary JSON object with a trackingId or geofenceId.
 *
 */
var Metadata = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - General utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   */
  function Metadata(utils) {
    _classCallCheck(this, Metadata);

    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string} generate URL for HERE Tracking
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */

    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */

    this.fetch = utils.fetch;
    /**
     * Allow methods to be called using trackingId or externalId/appId object
     * @type {function(url: string): Object}
     */

    this.normaliseId = utils.normaliseId;
  }
  /**
   * Gets metadata associated with the trackingId
   *
   * @param {string} idOrObject - can be a trackingId or an externalId/appId object
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
   * @param {string} options.pageToken - Token to request 'next page' when paging.
   * @returns {Object} Provides all metadata in a JSON object
   * @throws {Error} When an HTTP error has occurred
   */


  _createClass(Metadata, [{
    key: "get",
    value: function get(idOrObject, _ref) {
      var _this = this;

      var token = _ref.token,
          count = _ref.count,
          pageToken = _ref.pageToken;
      return this.validate({
        token: token,
        idOrObject: idOrObject
      }, ['token', 'idOrObject']).then(function () {
        var _this$normaliseId = _this.normaliseId(idOrObject),
            trackingId = _this$normaliseId.trackingId,
            queryParameters = _this$normaliseId.queryParameters;

        var url = _this.url('metadata', 'v2', 'devices', trackingId, queryParameters);

        return _this.fetch(url, {
          method: 'put',
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Updates the metadata object associated with a tracker
     *
     * The provided metadata is merged with the existing metadata object.
     *
     *  * new keys are added
     *. * the value of existing keys will be updated with the provided value
     *. * Adding value 'null' for a key deletes it from the metadata object
     *
     * Returns the updated metadata object.
     *
     * @param {string} idOrObject - can be a trackingId or an externalId/appId object
     * @param {Object} metadata - metadata to add to the tracker
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} The updated metadata object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "update",
    value: function update(idOrObject) {
      var _this2 = this;

      var metadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _ref2 = arguments.length > 2 ? arguments[2] : undefined,
          token = _ref2.token;

      return this.validate({
        token: token,
        idOrObject: idOrObject
      }, ['token', 'idOrObject']).then(function () {
        var _this2$normaliseId = _this2.normaliseId(idOrObject),
            trackingId = _this2$normaliseId.trackingId,
            queryParameters = _this2$normaliseId.queryParameters;

        var url = _this2.url('metadata', 'v2', 'devices', trackingId, queryParameters);

        return _this2.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(metadata)
        });
      });
    }
    /**
     * Updates a single metadata value
     *
     * Returns the updated metadata object.
     *
     * @param {string} idOrObject - can be a trackingId or an externalId/appId object
     * @param {string} key - The key where this value should be stored
     * @param {string} value - The value to store against the key
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} The updated metadata object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "setValue",
    value: function setValue(idOrObject, key, value, _ref3) {
      var _this3 = this;

      var token = _ref3.token;
      return this.validate({
        token: token,
        idOrObject: idOrObject
      }, ['token', 'idOrObject']).then(function () {
        var _this3$normaliseId = _this3.normaliseId(idOrObject),
            trackingId = _this3$normaliseId.trackingId,
            queryParameters = _this3$normaliseId.queryParameters;

        var url = _this3.url('metadata', 'v2', 'devices', trackingId, queryParameters);

        return _this3.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(_defineProperty({}, key, value))
        });
      });
    }
    /**
     * Deletes a single metadata key
     *
     * Returns the updated metadata object.
     *
     * @param {string} idOrObject - can be a trackingId or an externalId/appId object
     * @param {string} key - The key to delete
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} The updated metadata object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "deleteKey",
    value: function deleteKey(idOrObject, key, _ref4) {
      var _this4 = this;

      var token = _ref4.token;
      return this.validate({
        token: token,
        idOrObject: idOrObject
      }, ['token', 'idOrObject']).then(function () {
        var _this4$normaliseId = _this4.normaliseId(idOrObject),
            trackingId = _this4$normaliseId.trackingId,
            queryParameters = _this4$normaliseId.queryParameters;

        var url = _this4.url('metadata', 'v2', 'devices', trackingId, queryParameters);

        return _this4.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(_defineProperty({}, key, null))
        });
      });
    }
    /**
     * Deletes all aliases of this device.
     *
     * @param {string} idOrObject - can be a trackingId or an externalId/appId object
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Provides all aliases in a JSON object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "deleteAll",
    value: function deleteAll(idOrObject, _ref5) {
      var _this5 = this;

      var token = _ref5.token;
      return this.validate({
        token: token,
        idOrObject: idOrObject
      }, ['token', 'idOrObject']).then(function () {
        var _this5$normaliseId = _this5.normaliseId(idOrObject),
            trackingId = _this5$normaliseId.trackingId,
            queryParameters = _this5$normaliseId.queryParameters;

        var url = _this5.url('metadata', 'v2', 'devices', trackingId, queryParameters);

        return _this5.fetch(url, {
          method: 'delete',
          headers: new Headers({
            'x-confirm': 'true',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Gets metadata associated with the geofence
     *
     * @param {string} geofenceId - geofence ID
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Provides all metadata in a JSON object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "geofenceGet",
    value: function geofenceGet(geofenceId, _ref6) {
      var _this6 = this;

      var token = _ref6.token;
      return this.validate({
        token: token,
        geofenceId: geofenceId
      }, ['token', 'geofenceId']).then(function () {
        var url = _this6.url('metadata', 'v2', 'geofences', geofenceId);

        return _this6.fetch(url, {
          method: 'get',
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Updates the metadata object associated with a geofence
     *
     * The provided metadata is merged with the existing metadata object.
     *
     *  * new keys are added
     *. * the value of existing keys will be updated with the provided value
     *. * Adding value 'null' for a key deletes it from the metadata object
     *
     * Returns the updated metadata object.
     *
     * @param {string} geofenceId - geofence ID
     * @param {Object} metadata - metadata to add to the tracker
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} The updated metadata object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "geofenceUpdate",
    value: function geofenceUpdate(geofenceId) {
      var _this7 = this;

      var metadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _ref7 = arguments.length > 2 ? arguments[2] : undefined,
          token = _ref7.token;

      return this.validate({
        token: token,
        geofenceId: geofenceId
      }, ['token', 'geofenceId']).then(function () {
        var url = _this7.url('metadata', 'v2', 'geofences', geofenceId);

        return _this7.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(metadata)
        });
      });
    }
    /**
     * Updates a single metadata value
     *
     * Returns the updated metadata object.
     *
     * @param {string} geofenceId - geofence ID
     * @param {string} key - The key where this value should be stored
     * @param {string} value - The value to store against the key
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} The updated metadata object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "geofenceSetValue",
    value: function geofenceSetValue(geofenceId, key, value, _ref8) {
      var _this8 = this;

      var token = _ref8.token;
      return this.validate({
        token: token,
        geofenceId: geofenceId
      }, ['token', 'geofenceId']).then(function () {
        var url = _this8.url('metadata', 'v2', 'geofences', geofenceId);

        return _this8.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(_defineProperty({}, key, value))
        });
      });
    }
    /**
     * Deletes a single metadata key
     *
     * Returns the updated metadata object.
     *
     * @param {string} geofenceId - geofence ID
     * @param {string} key - The key to delete
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} The updated metadata object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "geofenceDeleteKey",
    value: function geofenceDeleteKey(geofenceId, key, _ref9) {
      var _this9 = this;

      var token = _ref9.token;
      return this.validate({
        token: token,
        geofenceId: geofenceId
      }, ['token', 'geofenceId']).then(function () {
        var url = _this9.url('metadata', 'v2', 'geofences', geofenceId);

        return _this9.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(_defineProperty({}, key, null))
        });
      });
    }
    /**
     * Deletes all aliases of this device.
     *
     * @param {string} geofenceId - geofence ID
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Provides all aliases in a JSON object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "geofenceDeleteAll",
    value: function geofenceDeleteAll(geofenceId, _ref10) {
      var _this10 = this;

      var token = _ref10.token;
      return this.validate({
        token: token,
        geofenceId: geofenceId
      }, ['token', 'geofenceId']).then(function () {
        var url = _this10.url('metadata', 'v2', 'geofences', geofenceId);

        return _this10.fetch(url, {
          method: 'delete',
          headers: new Headers({
            'x-confirm': 'true',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
  }]);

  return Metadata;
}();

module.exports = Metadata;

/***/ }),

/***/ "./notifications.js":
/*!**************************!*\
  !*** ./notifications.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Register and unregister notification channels.
 *
 * These channels will be used to inform users of device geofence transitions
 *
 * For more information, see:
 * https://developer.here.com/documentation/tracking/topics/notifications.html
 *
 */
var Notifications = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   */
  function Notifications(utils) {
    _classCallCheck(this, Notifications);

    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string} generate URL for HERE Tracking
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */

    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */

    this.fetch = utils.fetch;
  }
  /**
   * Register a notifications channel
   * /notifications/v2/register
   *
   * @param {string} type - Type of channel, possible value: 'webhook'
   * @param {Object} value - Channel details, URL for 'webhook'
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Success message
   * @throws {Error} When an HTTP error has occurred
   */


  _createClass(Notifications, [{
    key: "register",
    value: function register(type, value, _ref) {
      var _this = this;

      var token = _ref.token;
      return this.validate({
        type: type,
        token: token
      }, ['type', 'value', 'token']).then(function () {
        var channel = {
          type: type
        };

        if (type !== 'webhook') {
          return Promise.reject(new Error('Unsupported notification type'));
        }

        channel.url = value;

        var url = _this.url('notifications', 'v2', 'register');

        return _this.fetch(url, {
          method: 'post',
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(channel)
        });
      });
    }
    /**
     * Retrieve list of registered notification channels
     * /notifications/v2/registrations
     *
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} List of notification channels
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "list",
    value: function list(_ref2) {
      var _this2 = this;

      var token = _ref2.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        return _this2.fetch(_this2.url('notifications', 'v2', 'registrations'), {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Remove a notification channel
     *  /notifications/v2/registration/{channelName}
     *
     * @param {Object} channelName - ID of the channel
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "delete",
    value: function _delete(channelName, _ref3) {
      var _this3 = this;

      var token = _ref3.token;
      return this.validate({
        channelName: channelName
      }, ['channelName']).then(function () {
        return _this3.fetch(_this3.url('notifications', 'v2', 'registration', channelName), {
          method: 'delete',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
  }]);

  return Notifications;
}();

module.exports = Notifications;

/***/ }),

/***/ "./rules.js":
/*!******************!*\
  !*** ./rules.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Defining and manage sensor rules
 *
 */
var Rules = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - General utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   */
  function Rules(utils) {
    _classCallCheck(this, Rules);

    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string} Generate the URL for HERE Tracking
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */

    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */

    this.fetch = utils.fetch;
    /**
     * Sensor types
     */

    this.SENSOR_TYPES = ['acceleration', 'attach', 'battery', 'humidity', 'pressure', 'tamper', 'temperature'];
  }
  /**
   * List the rules available to the user.
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {number} [options.count] - Number of rules returned per page (default 100)
   * @param {string} [options.pageToken] - Page token used for retrieving next page
   * @returns {Object} Body of the rules response
   * @throws {Error} When an HTTP error has occurred
   */


  _createClass(Rules, [{
    key: "list",
    value: function list(_ref) {
      var _this = this;

      var count = _ref.count,
          pageToken = _ref.pageToken,
          token = _ref.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        var queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        var url = _this.url('sensors', 'v3', queryParameters);

        return _this.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Retrieve details about a rule.
     *
     * @param {string} ruleId - ID of sensor rule to retrieve
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body of the sensor rule response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "get",
    value: function get(ruleId, _ref2) {
      var _this2 = this;

      var token = _ref2.token;
      return this.validate({
        token: token,
        ruleId: ruleId
      }, ['token', 'ruleId']).then(function () {
        var url = _this2.url('sensors', 'v3', ruleId);

        return _this2.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Create rule
     *
     * @param {string} type - type of sensor
     * @param {Object} ruleOptions - Object containing rule details
     * @param {string} [ruleOptions.name] - human-readable name of rule
     * @param {string} [ruleOptions.description] - human-readable description of rule
     * @param {Object} [ruleOptions.threshold] - threshold
     * @param {number} [ruleOptions.threshold.value] - threshold value
     * @param {Object} [ruleOptions.range] - Object containing range details
     * @param {number} [ruleOptions.range.begin] - minimum value in range
     * @param {number} [ruleOptions.range.end] - maximum value in range
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object}
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "create",
    value: function create(type, _ref3, _ref4) {
      var _this3 = this;

      var name = _ref3.name,
          description = _ref3.description,
          range = _ref3.range,
          threshold = _ref3.threshold;
      var token = _ref4.token;
      return this.validate({
        type: type,
        token: token
      }, ['type', 'token']).then(function () {
        if (!_this3.SENSOR_TYPES.includes(type)) {
          return Promise.reject(new Error("Sensor rules must be one of: ".concat(_this3.SENSOR_TYPES.join(', '))));
        }

        var body = {
          type: type
        };
        if (name) body.name = name;
        if (description) body.description = description;
        if (threshold && typeof threshold.value !== 'undefined') body.threshold = threshold;
        if (range && typeof range.begin !== 'undefined' && typeof range.end !== 'undefined') body.range = range;
        return _this3.fetch(_this3.url('sensors', 'v3'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(body)
        });
      });
    }
    /**
     * Create a new attach-type sensor rule
     *
     * @param {Object} rule - Object containing rule definition
     * @param {string} rule.name - Valid user access token
     * @param {string} rule.description - Valid user access token
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} ID of the rule
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "createAttach",
    value: function createAttach(_ref5, _ref6) {
      var _this4 = this;

      var _ref5$name = _ref5.name,
          name = _ref5$name === void 0 ? '' : _ref5$name,
          _ref5$description = _ref5.description,
          description = _ref5$description === void 0 ? '' : _ref5$description;
      var token = _ref6.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        return _this4.fetch(_this4.url('sensors', 'v3'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify({
            name: name,
            description: description,
            type: 'attach'
          })
        });
      });
    }
    /**
     * Create a tamper-type sensor rule
     *
     * @param {Object} rule - Object containing rule definition
     * @param {string} rule.name - Valid user access token
     * @param {string} rule.description - Valid user access token
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} ID of the rule
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "createTamper",
    value: function createTamper(_ref7, _ref8) {
      var _this5 = this;

      var _ref7$name = _ref7.name,
          name = _ref7$name === void 0 ? '' : _ref7$name,
          _ref7$description = _ref7.description,
          description = _ref7$description === void 0 ? '' : _ref7$description;
      var token = _ref8.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        return _this5.fetch(_this5.url('sensors', 'v3'), {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify({
            name: name,
            description: description,
            type: 'tamper'
          })
        });
      });
    }
    /**
     * Update an existing sensor rule
     *
     * @param {string} id - rule id
     * @param {Object} ruleOptions - Object containing rule details
     * @param {string} [ruleOptions.name] - human-readable name of rule
     * @param {string} [ruleOptions.description] - human-readable description of rule
     * @param {Object} [ruleOptions.range] - Object containing range details
     * @param {number} [ruleOptions.range.begin] - minimum value in range
     * @param {number} [ruleOptions.range.end] - maximum value in range
     * @param {Object} [ruleOptions.threshold] - threshold
     * @param {number} [ruleOptions.threshold.value] - threshold value
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body of the geofence response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "update",
    value: function update(id, _ref9, _ref10) {
      var _this6 = this;

      var type = _ref9.type,
          name = _ref9.name,
          description = _ref9.description,
          range = _ref9.range,
          threshold = _ref9.threshold;
      var token = _ref10.token;
      return this.validate({
        id: id,
        token: token
      }, ['id', 'token']).then(function () {
        var url = _this6.url('sensors', 'v3', id);

        var body = {
          type: type // TODO: this should be ignored in the backend

        };
        if (name) body.name = name;
        if (description) body.description = description;
        if (threshold && typeof threshold.value !== 'undefined') body.threshold = threshold;
        if (range && typeof range.begin !== 'undefined' && typeof range.end !== 'undefined') body.range = range;
        return _this6.fetch(url, {
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(body)
        });
      });
    }
    /**
     * Remove rule
     *
     * @param {Object} ruleId - ID of the rule
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object}
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "remove",
    value: function remove(ruleId, _ref11) {
      var _this7 = this;

      var token = _ref11.token;
      return this.validate({
        ruleId: ruleId,
        token: token
      }, ['token', 'ruleId']).then(function () {
        return _this7.fetch(_this7.url('sensors', 'v3', ruleId), {
          method: 'delete',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Remove all rules.
     * This is a separate method so that it can't be called by accidentally
     * forgetting to pass rule ID
     *
     * @param {boolean} really - Confirmation to delete all
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object}
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "removeAll",
    value: function removeAll(really, _ref12) {
      var _this8 = this;

      var token = _ref12.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        if (really !== true) {
          return Promise.reject(new Error('Confirmation required to delete all rules.'));
        }

        var url = _this8.url('sensors', 'v3');

        return _this8.fetch(url, {
          method: 'delete',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token),
            'x-confirm': really
          })
        });
      });
    }
  }]);

  return Rules;
}();

module.exports = Rules;

/***/ }),

/***/ "./shadows.js":
/*!********************!*\
  !*** ./shadows.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Access to device shadows
 *
 * For more information, see:
 * https://developer.here.com/documentation/tracking/topics/shadows.html
 *
 */
var Shadows = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   * @param {function(trackingId: string): Object} utils.normaliseId - Allow methods to be called using trackingId or
   * externalId/appId object
   */
  function Shadows(utils) {
    _classCallCheck(this, Shadows);

    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string}
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */

    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */

    this.fetch = utils.fetch;
    /**
     * Allow methods to be called using trackingId or externalId/appId object
     * @type {function(trackingId: string): Object}
     */

    this.normaliseId = utils.normaliseId;
  }
  /**
   * Get the shadow of the specified device
   *
   * @param {string} idOrObject - Can be a trackingId or an externalId/appId object
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Newly modified device shadow
   * @throws {Error} When an HTTP error has occurred
   */


  _createClass(Shadows, [{
    key: "get",
    value: function get(idOrObject, _ref) {
      var _this = this;

      var token = _ref.token;
      return this.validate({
        token: token,
        idOrObject: idOrObject
      }, ['token', 'idOrObject']).then(function () {
        var _this$normaliseId = _this.normaliseId(idOrObject),
            trackingId = _this$normaliseId.trackingId,
            queryParameters = _this$normaliseId.queryParameters;

        return _this.fetch(_this.url('shadows', 'v2', trackingId, queryParameters), {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Get the shadow of the specified devices.
     *
     * By providing the `after` timestamp parameter the request will return those
     * shadow objects that were modified at or after the timestamp.
     *
     * By providing the `appId` parameter, the `trackingIds` is expected to be an
     * array of application specific external identifiers.
     *
     * @param {string} trackingIds - IDs of the devices
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {number} [options.after] - Milliseconds elapsed since 1 January 1970 00:00:00 UTC
     * @param {string} [options.appId] - Application identifier
     * @returns {Array} Array of shadow response objects
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getBatch",
    value: function getBatch(trackingIds, _ref2) {
      var _this2 = this;

      var token = _ref2.token,
          after = _ref2.after,
          appId = _ref2.appId;
      return this.validate({
        trackingIds: trackingIds,
        token: token
      }, ['trackingIds', 'token']).then(function () {
        if (!(trackingIds instanceof Array)) {
          return Promise.reject('You must supply an array');
        }

        if (trackingIds.length > 100) {
          return Promise.reject('Maximum batch size is 100');
        }

        var queryParameters = {};
        if (after) queryParameters.after = after;
        if (appId) queryParameters.appId = appId;

        var url = _this2.url('shadows', 'v2', 'batch', queryParameters);

        return _this2.fetch(url, {
          method: 'post',
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(trackingIds)
        });
      });
    }
    /**
     * Get desired shadow of the specified device or value of a single property
     * in the shadow if `selector` is provided.
     *
     * To pick a property from the shadow provide property's name as `selector`,
     * a nested property can be selected using slash as delimiter, like this: `payload/time/minutes`
     *
     * @param {string} idOrObject - Can be a trackingId or an externalId/appId object
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {string} [options.selector] - JSON selector
     * @returns {Object} Shadow of the queried object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getDesired",
    value: function getDesired(idOrObject, options) {
      return this.getByState(idOrObject, 'desired', options);
    }
    /**
     * @ignore
     */

  }, {
    key: "getByState",
    value: function getByState(idOrObject, state, _ref3) {
      var _this3 = this;

      var token = _ref3.token,
          selector = _ref3.selector;
      return this.validate({
        idOrObject: idOrObject,
        token: token
      }, ['idOrObject', 'token']).then(function () {
        var _this3$normaliseId = _this3.normaliseId(idOrObject),
            trackingId = _this3$normaliseId.trackingId,
            queryParameters = _this3$normaliseId.queryParameters;

        var url = selector ? _this3.url('shadows', 'v2', trackingId, state, selector, queryParameters) : _this3.url('shadows', 'v2', trackingId, state, queryParameters);
        return _this3.fetch(url, {
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Get reported shadow of the specified device or value of a single property
     * in the shadow if `selector` is provided.
     *
     * To pick a property from the shadow provide property's name as `selector`,
     * a nested property can be selected using slash as delimiter, like this: `payload/time/minutes`
     *
     * @param {string} idOrObject - Can be a trackingId or an externalId/appId object
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {string} [options.selector] - JSON selector
     * @returns {Object} Shadow of the queried object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getReported",
    value: function getReported(idOrObject, options) {
      return this.getByState(idOrObject, 'reported', options);
    }
    /**
     * Set the desired state of the specified device
     *
     * @param {string} idOrObject - Can be a trackingId or an externalId/appId object
     * @param {Object} desired - Object containing desired object configuration
     * @param {Object} [desired.payload] - payload object
     * @param {Object} [desired.system] - system object
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Shadow of the queried object
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "setDesired",
    value: function setDesired(idOrObject, desired, options) {
      var _this4 = this;

      var token = options.token;
      var shadow = {
        desired: {
          payload: desired.payload,
          system: desired.system
        }
      };
      return this.validate({
        idOrObject: idOrObject,
        shadow: shadow,
        token: token
      }, ['idOrObject', 'shadow', 'token']).then(function () {
        var _this4$normaliseId = _this4.normaliseId(idOrObject),
            trackingId = _this4$normaliseId.trackingId,
            queryParameters = _this4$normaliseId.queryParameters;

        return _this4.fetch(_this4.url('shadows', 'v2', trackingId, queryParameters), {
          method: 'put',
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          }),
          body: JSON.stringify(shadow)
        });
      });
    }
    /**
     * Remove all data from the shadow of the specified device
     * but don't remove the shadow object itself
     *
     * @param {string} idOrObject - Can be a trackingId or an externalId/appId object
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Empty response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "clear",
    value: function clear(idOrObject, _ref4) {
      var _this5 = this;

      var token = _ref4.token;
      return this.validate({
        idOrObject: idOrObject,
        token: token
      }, ['idOrObject', 'token']).then(function () {
        var _this5$normaliseId = _this5.normaliseId(idOrObject),
            trackingId = _this5$normaliseId.trackingId,
            queryParameters = _this5$normaliseId.queryParameters;

        return _this5.fetch(_this5.url('shadows', 'v2', trackingId, queryParameters), {
          method: 'delete',
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
  }]);

  return Shadows;
}();

module.exports = Shadows;

/***/ }),

/***/ "./traces.js":
/*!*******************!*\
  !*** ./traces.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Access to device traces
 *
 * For more information, see:
 * https://developer.here.com/documentation/tracking/topics/traces.html
 *
 */
var Traces = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   */
  function Traces(utils) {
    _classCallCheck(this, Traces);

    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string}
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */

    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */

    this.fetch = utils.fetch;
  }
  /**
   * Get the specified number of recent trace samples.
   *
   * Always returns the filtered trace.
   *
   * @example
   * const last5 = hereTracking.traces.getLastN('HERE-123...', 5, { token: 'h1.123...' })
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {number} last - retrieve the last N samples
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
   * @param {string} options.pageToken - Token to request 'next page' when paging.
   * @returns {Array} History of traces of the device
   * @throws {Error} When an HTTP error has occurred
   */


  _createClass(Traces, [{
    key: "getLastN",
    value: function getLastN(trackingId, last, options) {
      return this.get(trackingId, {
        last: last
      }, options);
    }
    /**
     * Get the trace of the specified device before the given timestamp.
     *
     * Always returns the filtered trace.
     *
     * @example
     * hereTracking.traces.getBefore('HERE-123...', Date.now() - 300000, { token: 'h1.123...' })
     *
     * @param {string} trackingId - Tracking ID of the device
     * @param {number} before - retrieve the samples before this millisecond timestamp
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
     * @param {string} options.pageToken - Token to request 'next page' when paging.
     * @returns {Array} History of traces of the device
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getBefore",
    value: function getBefore(trackingId, before, options) {
      return this.get(trackingId, {
        before: before
      }, options);
    }
    /**
     * Get the trace of the specified device after the given timestamp.
     *
     * Always returns the filtered trace.
     *
     * @example
     * hereTracking.traces.getAfter('HERE-123...', Date.now() - 300000, { token: 'h1.123...' })
     *
     * @param {string} trackingId - Tracking ID of the device
     * @param {number} after - retrieve the samples after this millisecond timestamp
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
     * @param {string} options.pageToken - Token to request 'next page' when paging.
     * @returns {Array} History of traces of the device
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getAfter",
    value: function getAfter(trackingId, after, options) {
      return this.get(trackingId, {
        after: after
      }, options);
    }
    /**
     * Get the trace of the specified device between two timestamps.
     *
     * Always returns the filtered trace.
     *
     * @example
     * hereTracking.traces.getBetween('HERE-123...', Date.now() - 300000, Date.now() - 600000, { token: 'h1.123...' })
     *
     * @param {string} trackingId - Tracking ID of the device
     * @param {number} before - retrieve the samples before this timestamp
     * @param {number} after - retrieve the samples after this timestamp
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
     * @param {string} options.pageToken - Token to request 'next page' when paging.
     * @returns {Array} History of traces of the device
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getBetween",
    value: function getBetween(trackingId, before, after, options) {
      return this.get(trackingId, {
        before: before,
        after: after
      }, options);
    }
    /**
     * Get the trace of the specified device
     *
     * @example
     * const trace = hereTracking.traces.get('HERE-123...', {}, { token: 'h1.123...' })
     *
     * @example
     * const traceFirstPage = hereTracking.traces.get('HERE-123...', {}, { token: 'h1.123...' })
     *
     * @example
     * hereTracking.traces.get('HERE-123...', {}, { token: 'h1.123...', pageToken: tokenFromPreviousRequest })
     *
     * @param {string} trackingId - Tracking ID of the device
     * @param {Object} traceOptions - time range and filter options
     * @param {number} [options.last] - Retrieve the last N samples
     * @param {number} [options.before] - Retrieve the samples before this timestamp
     * @param {number} [options.after] - Retrieve the samples after this timestamp
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
     * @param {string} options.pageToken - Token to request 'next page' when paging.
     * @returns {Array} History of traces of the device
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "get",
    value: function get(trackingId, _ref, _ref2) {
      var _this = this;

      var last = _ref.last,
          before = _ref.before,
          after = _ref.after;
      var token = _ref2.token,
          count = _ref2.count,
          pageToken = _ref2.pageToken;
      return this.validate({
        token: token,
        trackingId: trackingId
      }, ['token', 'trackingId']).then(function () {
        var queryParameters = {};

        if (last) {
          queryParameters.last = last;
        }

        if (before) {
          queryParameters.before = before;
        }

        if (after) {
          queryParameters.after = after;
        }

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        return _this.fetch(_this.url('traces', 'v2', trackingId, queryParameters), {
          method: 'get',
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Remove the trace of the specified device
     *
     * @example
     * const deleted = hereTracking.traces.remove('HERE-123...', { token: 'h1.123...' })
     *
     * @param {string} trackingId - Tracking ID of the device
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "remove",
    value: function remove(trackingId, _ref3) {
      var _this2 = this;

      var token = _ref3.token;
      return this.validate({
        token: token,
        trackingId: trackingId
      }, ['token', 'trackingId']).then(function () {
        return _this2.fetch(_this2.url('traces', 'v2', trackingId), {
          method: 'delete',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
  }]);

  return Traces;
}();

module.exports = Traces;

/***/ }),

/***/ "./transitions.js":
/*!************************!*\
  !*** ./transitions.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Access to device geofence transitions
 *
 * For more information, see:
 * https://developer.here.com/documentation/tracking/topics/traces.html
 */
var Transitions = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   */
  function Transitions(utils) {
    _classCallCheck(this, Transitions);

    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string}
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */

    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */

    this.fetch = utils.fetch;
  }
  /**
   * Get the specified number of recent transitions.
   *
   * @param {string} trackingId - Tracking ID of the device
   * @param {number} last - retrieve the last N transitions
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
   * @param {string} options.pageToken - Token to request 'next page' when paging.
   * @returns {Array} History of traces of the device
   * @throws {Error} When an HTTP error has occurred
   */


  _createClass(Transitions, [{
    key: "getLastN",
    value: function getLastN(trackingId, last, options) {
      return this.get(trackingId, {
        last: last
      }, options);
    }
    /**
     * Get the transitions of the specified device before the given timestamp.
     *
     * @param {string} trackingId - Tracking ID of the device
     * @param {number} before - retrieve the transitions before this timestamp
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
     * @param {string} options.pageToken - Token to request 'next page' when paging.
     * @returns {Array} History of traces of the device
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getBefore",
    value: function getBefore(trackingId, before, options) {
      return this.get(trackingId, {
        before: before
      }, options);
    }
    /**
     * Get the transitions of the specified device after the given timestamp.
     *
     * @param {string} trackingId - Tracking ID of the device
     * @param {number} after - retrieve the transitions after this timestamp
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
     * @param {string} options.pageToken - Token to request 'next page' when paging.
     * @returns {Array} History of traces of the device
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getAfter",
    value: function getAfter(trackingId, after, options) {
      return this.get(trackingId, {
        after: after
      }, options);
    }
    /**
     * Get the transitions of the specified device between two timestamps.
     *
     * @param {string} trackingId - Tracking ID of the device
     * @param {number} before - retrieve the transitions before this timestamp
     * @param {number} after - retrieve the transitions after this timestamp
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {string} options.count - Number of results per page (maximum 1000, default 1000).
     * @param {string} options.pageToken - Token to request 'next page' when paging.
     * @returns {Array} History of traces of the device
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getBetween",
    value: function getBetween(trackingId, before, after, options) {
      return this.get(trackingId, {
        before: before,
        after: after
      }, options);
    }
    /**
     * Get the transitions of the specified device
     *
     * @param {string} trackingId - Tracking ID of the device
     * @param {Object} traceOptions - Object containing time range and filter options
     * @param {number} [options.last] - retrieve the last N transitions
     * @param {number} [options.before] - retrieve the transitions before this timestamp
     * @param {number} [options.after] - retrieve the transitions after this timestamp
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @param {string} options.count - Number of results per page. (maximum 1000, default 1000).
     * @param {string} options.pageToken - Token to request 'next page' when paging.
     * @returns {Array} History of transitions of the device
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "get",
    value: function get(trackingId, _ref, _ref2) {
      var _this = this;

      var last = _ref.last,
          before = _ref.before,
          after = _ref.after;
      var token = _ref2.token,
          count = _ref2.count,
          pageToken = _ref2.pageToken;
      return this.validate({
        token: token,
        trackingId: trackingId
      }, ['token', 'trackingId']).then(function () {
        var queryParameters = {};

        if (last) {
          queryParameters.last = last;
        }

        if (before) {
          queryParameters.before = before;
        }

        if (after) {
          queryParameters.after = after;
        }

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        return _this.fetch(_this.url('transitions', 'v2', 'devices', trackingId, queryParameters), {
          method: 'get',
          credentials: 'include',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
  }]);

  return Transitions;
}();

module.exports = Transitions;

/***/ }),

/***/ "./users.js":
/*!******************!*\
  !*** ./users.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Log in users, refresh access tokens and list available devices
 *
 */
var Users = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   */
  function Users(utils) {
    _classCallCheck(this, Users);

    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string}
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */

    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */

    this.fetch = utils.fetch;
  }
  /**
   * Get the list of devices for a user
   *
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {Object} Array of device IDs
   * @throws {Error} When an HTTP error has occurred
   */


  _createClass(Users, [{
    key: "listDevices",
    value: function listDevices(_ref) {
      var _this = this;

      var count = _ref.count,
          pageToken = _ref.pageToken,
          token = _ref.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        var queryParameters = {};

        if (count) {
          queryParameters.count = count;
        }

        if (pageToken) {
          queryParameters.pageToken = pageToken;
        }

        return _this.fetch(_this.url('users', 'v2', 'devices', queryParameters), {
          method: 'get',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Log in user
     *
     * @param {string} email - User's email address
     * @param {string} password - User's password
     * @returns {Object} Log in response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "login",
    value: function login(email, password) {
      var _this2 = this;

      return this.validate({
        email: email,
        password: password
      }, ['email', 'password']).then(function () {
        var url = _this2.url('users', 'v2', 'login');

        return _this2.fetch(url, {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            email: email,
            password: password
          })
        });
      });
    }
    /**
     * Refresh user access token
     *
     * @param {string} accessToken - Expired access token
     * @param {string} refreshToken - Token received during login
     * @returns {Object} Log in response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "refresh",
    value: function refresh(accessToken, refreshToken) {
      var _this3 = this;

      return this.validate({
        accessToken: accessToken,
        refreshToken: refreshToken
      }, ['accessToken', 'refreshToken']).then(function () {
        var url = _this3.url('users', 'v2', 'refresh');

        return _this3.fetch(url, {
          method: 'post',
          body: JSON.stringify({
            accessToken: accessToken,
            refreshToken: refreshToken
          })
        });
      });
    }
    /**
     * Retrieves application license information
     * /registry/v2/licenses
     *
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Array} An array contains all applications license information of the user
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getLicenseInfo",
    value: function getLicenseInfo(_ref2) {
      var _this4 = this;

      var token = _ref2.token;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        return _this4.fetch(_this4.url('registry', 'v2', 'licenses'), {
          method: 'get',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      }).then(function (json) {
        return json.licenses;
      });
    }
    /**
     * Get a single page of projects
     *
     * @param {Object} options Options containing the Authorization token and paging details
     * @returns {Object} A page of the user's projects.
     */

  }, {
    key: "getProjectsPage",
    value: function getProjectsPage(_ref3) {
      var _this5 = this;

      var token = _ref3.token,
          start = _ref3.start,
          end = _ref3.end;
      return this.validate({
        token: token
      }, ['token']).then(function () {
        var url = _this5.url('projects', 'v1', {
          startIndex: start,
          endIndex: end,
          role: 'PrA'
        });

        return _this5.fetch(url, {
          method: 'GET',
          headers: new Headers({
            Authorization: "Bearer ".concat(token)
          })
        });
      }).then(function (json) {
        return json;
      });
    }
    /**
     * Get an array of tracking projects in the user account
     *
     * This slurps the projects response to gather all pages.
     *
     * @param {Object} options Options containing the Authorization token
     * @returns {Array} A list of the user's projects.
     */

  }, {
    key: "listProjects",
    value: function listProjects(_ref4) {
      var _this6 = this;

      var token = _ref4.token;
      return this.validate({
        token: token
      }, ['token']).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var options, projects, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = {
                  start: 0,
                  end: 100,
                  token: token
                };
                projects = [];
                json = {
                  total: 1,
                  end: 0
                };

              case 3:
                if (!(json.total > json.end)) {
                  _context.next = 12;
                  break;
                }

                _context.next = 6;
                return _this6.getProjectsPage(options);

              case 6:
                json = _context.sent;

                /* eslint-disable-line no-await-in-loop */
                projects = projects.concat(json.projects.filter(function (prj) {
                  return prj.type === 'tracking';
                }));
                options.start = json.end + 1;
                options.end = json.end + 100;
                _context.next = 3;
                break;

              case 12:
                return _context.abrupt("return", projects);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    }
  }]);

  return Users;
}();

module.exports = Users;

/***/ }),

/***/ "./vendor.js":
/*!*******************!*\
  !*** ./vendor.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (C) 2017-2019 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 *
 *
 * Provision new devices.
 *
 * Create new requests for a specified number of devices, manage requests,
 * retrieve freshly minted device licences.
 *
 * For more information, see:
 * https://developer.here.com/documentation/tracking/topics/vendor.html
 */
var Vendor = /*#__PURE__*/function () {
  /**
   * @param {Object} utils - general utilities passed from main HERETracking
   * @param {function(varArgs: ...string): string} utils.url - Generate the URL for HERE Tracking
   * @param {function(options: Object, required: Array): Promise} utils.validate - Check the supplied parameters
   * @param {function(url: string, options: Object): Object} utils.fetch - Wrap the standard Fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to provide error handling
   * @param {function(deviceId: string, options: Object): Object} claimDevice - Reference to the device
   * claiming method of the Devices class
   */
  function Vendor(utils, claimDevice) {
    _classCallCheck(this, Vendor);

    /**
     * Generate the URL for HERE Tracking
     * @type {function(varArgs: ...string): string}
     */
    this.url = utils.url;
    /**
     * Check the supplied parameters
     * @type {function(options: Object, required: Array): Promise}
     */

    this.validate = utils.validate;
    /**
     * Wrap the standard Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
     * to provide error handling
     * @type {function(url: string, options: Object): Object}
     */

    this.fetch = utils.fetch;
    /**
     * Reference to the device claiming method of the Devices class
     * @type {function(deviceId: string, options: Object): Object}
     */

    this.claimDevice = claimDevice;
  }
  /**
   * Create a new request for device licences.
   * /registry/v2/{app_ID}/devices
   *
   * @param {string} vendorId - Valid appId enabled for HERE Tracking
   * @param {string} count - Number of licences to create
   * @param {Object} options - Object containing request options
   * @param {string} options.token - Valid user access token
   * @returns {string} Request ID
   * @throws {Error} When an HTTP error has occurred
   */


  _createClass(Vendor, [{
    key: "requestBatch",
    value: function requestBatch(vendorId, count, _ref) {
      var _this = this;

      var token = _ref.token;
      return this.validate({
        vendorId: vendorId,
        count: count,
        token: token
      }, ['vendorId', 'count', 'token']).then(function () {
        return _this.fetch(_this.url('registry', 'v2', vendorId, 'devices'), {
          method: 'post',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token),
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            count: count
          })
        }).then(function (json) {
          return json.jobId;
        });
      });
    }
    /**
     * Create a new request for device licences given an external ID
     * /registry/v2/{app_ID}/devices
     *
     *    {
     *      "devices":[{
     *        "id": "externalId1"
     *      }, {
     *        "id": "externalId2"
     *      }]
     *.   }
     *
     *
     * @param {string} vendorId - Valid appId enabled for HERE Tracking
     * @param {Array} devices - Array of external IDs for new devices
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {string} Request ID
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "requestBatchExternalId",
    value: function requestBatchExternalId(vendorId, devices, _ref2) {
      var _this2 = this;

      var token = _ref2.token;
      var body = {
        devices: devices.map(function (deviceId) {
          return {
            id: deviceId
          };
        })
      };
      return this.validate({
        vendorId: vendorId,
        devices: devices,
        token: token
      }, ['vendorId', 'devices', 'token']).then(function () {
        return _this2.fetch(_this2.url('registry', 'v2', vendorId, 'devices'), {
          method: 'post',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token),
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            body: body
          })
        }).then(function (json) {
          return json.jobId;
        });
      });
    }
    /**
     * Check on the status of a previous request
     * /registry/v2/{jobId}/status
     *
     * @param {string} jobId - ID of the request
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body of the status check response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "checkBatchStatus",
    value: function checkBatchStatus(jobId, _ref3) {
      var _this3 = this;

      var token = _ref3.token;
      return this.validate({
        jobId: jobId,
        token: token
      }, ['jobId', 'token']).then(function () {
        return _this3.fetch(_this3.url('registry', 'v2', jobId, 'status'), {
          method: 'get',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
    /**
     * Get the results of a completed batch request
     * /v2/{jobId}/results
     *
     * @param {string} jobId - ID of the request
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body of the status check response
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getBatchResults",
    value: function getBatchResults(jobId, _ref4) {
      var _this4 = this;

      var token = _ref4.token;
      return this.validate({
        jobId: jobId,
        token: token
      }, ['jobId', 'token']).then(function () {
        return _this4.fetch(_this4.url('registry', 'v2', jobId, 'results'), {
          method: 'get',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      });
    }
  }, {
    key: "waitForBatchResults",

    /**
     * Helper function to repeatedly check batch status until the job is complete
     *
     * @param {string} jobId - ID of the request
     * @param {Object} options - Object containing method options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Body of the status check response
     * @throws {Error} When an HTTP error has occurred
     */
    value: function waitForBatchResults(jobId, options) {
      var _this5 = this;

      if (!this.batchTimeout) {
        this.batchTimeout = +new Date() + 30000;
      }

      if (+new Date() > this.batchTimeout) {
        delete this.batchTimeout;
        return Promise.reject(new Error('Timed out retrieving batch results'));
      }

      return this.checkBatchStatus(jobId, options).then(function (status) {
        if (status.status === 'complete') {
          delete _this5.batchTimeout;
          return _this5.getBatchResults(jobId, options);
        }

        return new Promise(function (resolve) {
          return setTimeout(function () {
            return resolve();
          }, 1000);
        }).then(function () {
          return _this5.waitForBatchResults(jobId, options);
        });
      });
    }
    /**
     * Create device licenses.
     *
     * @param {string} vendorId - Valid appId enabled for HERE Tracking
     * @param {Object} options - Object containing method options
     * @param {string} options.token - Valid user access token
     * @param {string} options.count - Number of licenses to create. Default is 1.
     * @returns {Array} Device licenses
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "provision",
    value: function provision(vendorId, _ref5) {
      var _this6 = this;

      var token = _ref5.token,
          _ref5$count = _ref5.count,
          count = _ref5$count === void 0 ? 1 : _ref5$count;

      if (count > 100) {
        return Promise.reject(new Error('Too many licenses requested, maximum is 100'));
      }

      return this.validate({
        vendorId: vendorId,
        token: token
      }, ['vendorId', 'token']).then(function () {
        return _this6.requestBatch(vendorId, count, {
          token: token
        });
      }).then(function (jobId) {
        return _this6.waitForBatchResults(jobId, {
          token: token
        });
      }).then(function (result) {
        var _ref6 = result || {},
            data = _ref6.data;

        if (!data || data.length === 0) {
          return Promise.reject(new Error('No Device license created'));
        }

        return data;
      });
    }
    /**
     * Create a license and autoclaim a Device.
     *
     * This creates a license using a vendor account
     * Then immediately claims it to the same account
     * as if it were a standard user.standard
     *
     * Typically, this is only used for testing and development.
     *
     * @param {string} vendorId - Valid appId enabled for HERE Tracking
     * @param {Object} options - Object containing method options
     * @param {string} options.token - Valid user access token
     *
     * @returns {Object} Device data and trackingId
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "provisionAndClaim",
    value: function provisionAndClaim(vendorId, _ref7) {
      var _this7 = this;

      var token = _ref7.token;
      return this.provision(vendorId, {
        token: token
      }).then(function () {
        var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var _ref8 = result[0] || {},
            deviceId = _ref8.deviceId,
            deviceSecret = _ref8.deviceSecret;

        if (deviceId) {
          return _this7.claimDevice(deviceId, {
            token: token
          }).then(function (_ref9) {
            var trackingId = _ref9.trackingId;
            return {
              trackingId: trackingId,
              deviceId: deviceId,
              deviceSecret: deviceSecret
            };
          });
        }

        return Promise.reject(new Error('No Device license created'));
      });
    }
    /**
     * Retrieves the count of already created licenses.
     * /registry/v2/{app_ID}/licenseCount
     *
     * @param {string} vendorId - Valid appId enabled for HERE Tracking
     * @param {Object} options - Object containing request options
     * @param {string} options.token - Valid user access token
     * @returns {Object} Object with number of created licenses
     * @throws {Error} When an HTTP error has occurred
     */

  }, {
    key: "getLicenseCount",
    value: function getLicenseCount(vendorId, _ref10) {
      var _this8 = this;

      var token = _ref10.token;
      return this.validate({
        vendorId: vendorId,
        token: token
      }, ['vendorId', 'token']).then(function () {
        return _this8.fetch(_this8.url('registry', 'v2', vendorId, 'licenseCount'), {
          method: 'get',
          headers: new Headers({
            'Authorization': "Bearer ".concat(token)
          })
        });
      }).then(function (json) {
        return json.count;
      });
    }
  }]);

  return Vendor;
}();

module.exports = Vendor;

/***/ })

/******/ });
});
//# sourceMappingURL=HERETracking.js.map