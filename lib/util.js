/**
 * Provides utility functions
 *
 * @type {{
 *      convertToDigitString: module.exports.convertToDigitString,
 *      mod97: module.exports.mod97,
 *      str_pad: module.exports.str_pad,
 *      array_pad: module.exports.array_pad,
 *      addSpaceAfterNumCharacters: module.exports.addSpaceAfterNumCharacters
 * }}
 */
module.exports = {
    convertToDigitString: function (account) {
        var digitString = '';
        for (var index = 0; index < account.length; index++) {
            var code = account[index].toUpperCase().charCodeAt(0);
            digitString += code < 65 ? account[index] : code - 55;
        }
        return digitString;
    },

    mod97: function (digitString) {
        var m = 0;
        for (var i = 0; i < digitString.length; ++i) {
            m = ((m * 10) + (digitString[i] |0)) % 97;
        }
        return m;
    },

    str_pad: function (input, pad_length, pad_string, pad_type) {
        var output = input.toString();
        if (pad_string === undefined) { pad_string = ' '; }
        if (pad_type === undefined) { pad_type = 'STR_PAD_RIGHT'; }
        if (pad_type == 'STR_PAD_RIGHT') {
            while (output.length < pad_length) {
                output = output + pad_string;
            }
        } else if (pad_type == 'STR_PAD_LEFT') {
            while (output.length < pad_length) {
                output = pad_string + output;
            }
        } else if (pad_type == 'STR_PAD_BOTH') {
            var j = 0;
            while (output.length < pad_length) {
                if (j % 2) {
                    output = output + pad_string;
                } else {
                    output = pad_string + output;
                }
                j++;
            }
        }
        return output;
    },

    array_pad: function (input, padSize, padValue) {
        var pad = [];
        var newArray = [];
        var newLength;
        var diff = 0;
        var i = 0;

        if (Object.prototype.toString.call(input) === '[object Array]' && !isNaN(padSize)) {
            newLength = ((padSize < 0) ? (padSize * -1) : padSize);
            diff = newLength - input.length;

            if (diff > 0) {
                for (i = 0; i < diff; i++) {
                    newArray[i] = padValue;
                }
                pad = ((padSize < 0) ? newArray.concat(input) : input.concat(newArray));
            } else {
                pad = input;
            }
        }

        return pad;
    },

    addSpaceAfterNumCharacters: function (string, numCharacters) {
        var result = "";
        for (var i = 0; i < string.length; ++i) {
            if (i > 0 && i % numCharacters === 0) {
                result += " ";
            }
            result += string[i];
        }
        return result;
    }
};