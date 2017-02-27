# random-codegen
CLI tool for outputting random codes with some basic options

After global installation this can be run using the 'gencodes' command with the following options

 Options:

    -h, --help                     output usage information
    -c, --count <count>            The amount of codes to create
    -p, --prefix <prefix>          The prefix for codes
    -l, --codelength <codelength>  The length of each code
    -m, --mask <mask>              The types of letters to include A: uppercase, a: lowercase, #: numbers, !:special chars e.g. A#  (will be a combination of uppercase and numbers)
    -e, --exclusions <exclusions>  Specific types of letters to exclude


Example usage:
``` gencodes  --prefix pp --codelength 40 --mask A --exclusions ABCDEFGHIJK --count 500  ./test.csv ```

Output:
``` PPVNZOTUWSWVSTYOLLPYQLTNLTSYXPVQTSQWQUTQYP ```
