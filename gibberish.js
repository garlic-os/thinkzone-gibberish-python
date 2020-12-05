// Gibberish Generator (JavaScript).
// Algorithm: Letter-based Markov text generator.
// Keith Enevoldsen, thinkzone.wlonk.com

function _pick_match_index(text, target, nchars) {
    // Find all sets of matching target characters.
    var nmatches = 0;
    var targetIndex = -1;
    while (true) {
        targetIndex = text.indexOf(target, targetIndex + 1);
        if (targetIndex === -1 || targetIndex >= nchars) {
            break;
        }
        ++nmatches;
    }

    // Pick a match at random.
    return ~~(nmatches * Math.random());
}


function _pick_char(text, target, level, nchars) {
    const matchIndex = _pick_match_index(text, target, nchars);

    // Find the character following the matching characters.
    var nmatches = 0;
    var targetIndex = -1;
    while (true) {
        targetIndex = text.indexOf(target, targetIndex + 1);
        if (targetIndex === -1 || targetIndex >= nchars) {
            throw new Error("Index out of range. This should never happen.");
        } else if (matchIndex === nmatches) {
            // If this new index is out of bounds, return an empty string instead of undefined.
            return text[targetIndex + level - 1] || "";
        }
        ++nmatches;
    }
}


function generate_gibberish(text, level=4, length=500) {
    const nchars = text.length;

    // Check input length.
    if (nchars < level) {
        throw new RangeError("Too few input characters.");
    }

    // Make the string contain two copies of the input text.
    // This allows for wrapping to the beginning when the end is reached.
    text += text;

    // Ensure the input text ends with a space.
    // if (text.slice(-1) !== " ") {
    //     text += " ";
    // }

    // Pick a random starting character, preferably an uppercase letter.
    for (let i = 0; i < 1000; ++i) {
        charIndex = ~~(nchars * Math.random());
        if (/[A-Z]/.test(text[charIndex])) {
            break;
        }
    }

    // Write starting characters.
    var output = text.substring(charIndex, charIndex + level);

    // Set target string.
    var target = text.substring(charIndex + 1, charIndex + level);

    // Generate characters.
    for (let i = 0; i < length; ++i) {

        if (level === 1) {
            // Pick a random character.
            output += text[~~(nchars * Math.random())];
        } else {
            // Pick the next character.
            // If this returns None, use the last picked character instead.
            var char = _pick_char(text, target, level, nchars);

            // Update the target.
            target = target.substring(1, level - 1) + char;

            // Add the character to the output.
            output += char;
        }
    }
    return output;
}


const bee = "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway, because bees don't care what humans think is impossible.";
var output;

// for (let i = 0; i < 500; ++i) {
//     output = generate_gibberish(bee, 3, 500);
//     if (output.includes("AAA")) {
//         console.log("You broke it");
//         break;
//     }
// }

output = generate_gibberish(bee, 3, 500);

console.log(output);
