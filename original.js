// Gibberish Generator (JavaScript).
// Algorithm: Letter-based Markov text generator.
// Keith Enevoldsen, thinkzone.wlonk.com

function generate_gibberish(str, lev) {
    var nchars = str.length;

    // Make the string contain two copies of the input text.
    // This allows for wrapping to the beginning when the end is reached.
    str = str + str;

    var ichar;
    var chr;
    var nmatches;
    var j;
    var imatch;

    // Check input length.
    if (nchars < lev) {
        alert("Too few input characters.");
        return;
    }

    // Pick a random starting character, preferably an uppercase letter.
    for (var i = 0; i < 1000; i++) {
        ichar = Math.floor(nchars * Math.random());
        chr = str.charAt(ichar);
        if ((chr >= "A") && (chr <= "Z")) break;
    }

    // Write starting characters.
    var output = str.substring(ichar, ichar + lev);

    // Set target string.
    var target = str.substring(ichar + 1, ichar + lev);

    // Generate characters.
    // Algorithm: Letter-based Markov text generator.
    for (var i = 0; i < 500; i++) {
        if (lev == 1) {
            // Pick a random character.
            chr = str.charAt(Math.floor(nchars * Math.random()));
        } else {
            // Find all sets of matching target characters.
            nmatches = 0;
            j = -1;
            while (true) {
                j = str.indexOf(target, j + 1)
                if ((j < 0) || (j >= nchars)) {
                    break;
                } else {
                    nmatches++;
                }
            }

            // Pick a match at random.
            imatch = Math.floor(nmatches * Math.random());

            // Find the character following the matching characters.
            nmatches = 0
            j = -1
            while (true) {
                j = str.indexOf(target, j + 1);
                if ((j < 0) || (j >= nchars)) {
                    // To show that this never happens
                    throw "This should not happen";
                    // break;
                } else if (imatch == nmatches) {
                    chr = str.charAt(j + lev - 1);
                    break;
                } else {
                    nmatches++;
                }
            }
        }

        // Output the character.
        output += chr;

        // Update the target.
        if (lev > 1) {
            target = target.substring(1, lev - 1) + chr;
        }
    }
    return output;
}


const bee = "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway, because bees don't care what humans think is impossible.";
const output = generate_gibberish(bee, 3, 500);
console.log(output);
