const dataMoviesWords = {
    "Romance": {
        "love": 2115,
        "christmas": 680,
        "you": 581,
        "my": 569,
        "me": 428,
        "man": 339,
        "girl": 322,
        "with": 287,
        "2": 278,
        "na": 269
    },
    "Documentary": {
        "story": 2981,
        "life": 2089,
        "with": 1783,
        "my": 1661,
        "world": 1398,
        "del": 1093,
        "das": 1068,
        "documentary": 1056,
        "making": 1015,
        "man": 1010
    },
    "News": {
        "american": 26,
        "story": 24,
        "news": 22,
        "world": 20,
        "war": 20,
        "life": 20,
        "we": 19,
        "with": 19,
        "our": 18,
        "land": 17
    },
    "Sport": {
        "vs": 624,
        "football": 241,
        "story": 218,
        "liverpool": 194,
        "club": 192,
        "city": 164,
        "united": 147,
        "manchester": 124,
        "game": 115,
        "world": 110
    },
    "\\N": {
        "il": 724,
        "di": 710,
        "das": 629,
        "onna": 585,
        "del": 567,
        "chikan": 473,
        "untitled": 442,
        "ni": 430,
        "na": 403,
        "wa": 391
    },
    "Action": {
        "2": 640,
        "vs": 407,
        "man": 385,
        "black": 347,
        "movie": 342,
        "last": 331,
        "ang": 322,
        "untitled": 299,
        "ng": 289,
        "project": 275
    },
    "Adventure": {
        "movie": 316,
        "del": 256,
        "2": 241,
        "di": 221,
        "lost": 214,
        "adventures": 212,
        "last": 199,
        "il": 199,
        "man": 198,
        "adventure": 188
    },
    "Biography": {
        "story": 803,
        "life": 476,
        "my": 327,
        "man": 300,
        "untitled": 296,
        "project": 222,
        "with": 214,
        "love": 191,
        "american": 176,
        "di": 146
    },
    "Drama": {
        "love": 2764,
        "my": 1866,
        "man": 1656,
        "you": 1395,
        "story": 1369,
        "life": 1350,
        "me": 1345,
        "di": 1243,
        "del": 1202,
        "na": 1099
    },
    "Fantasy": {
        "christmas": 178,
        "2": 136,
        "time": 106,
        "you": 105,
        "magic": 103,
        "love": 98,
        "del": 97,
        "last": 90,
        "man": 86,
        "my": 84
    },
    "Comedy": {
        "love": 1624,
        "2": 1123,
        "my": 1119,
        "you": 977,
        "me": 964,
        "christmas": 964,
        "man": 939,
        "movie": 912,
        "with": 809,
        "di": 671
    },
    "War": {
        "war": 354,
        "na": 90,
        "battle": 81,
        "story": 75,
        "last": 73,
        "my": 69,
        "v": 59,
        "di": 57,
        "zhan": 52,
        "man": 43
    },
    "Crime": {
        "man": 389,
        "murder": 329,
        "2": 278,
        "night": 274,
        "crime": 259,
        "story": 243,
        "das": 223,
        "black": 207,
        "city": 199,
        "death": 194
    },
    "Family": {
        "christmas": 736,
        "my": 241,
        "little": 192,
        "2": 190,
        "love": 172,
        "with": 153,
        "life": 152,
        "story": 152,
        "family": 145,
        "movie": 142
    },
    "History": {
        "story": 325,
        "war": 216,
        "di": 169,
        "del": 145,
        "last": 141,
        "history": 129,
        "american": 122,
        "life": 121,
        "il": 120,
        "my": 114
    },
    "Sci-Fi": {
        "time": 233,
        "space": 200,
        "alien": 191,
        "project": 180,
        "man": 161,
        "star": 145,
        "last": 132,
        "untitled": 124,
        "world": 123,
        "dark": 110
    },
    "Thriller": {
        "night": 447,
        "dark": 388,
        "man": 355,
        "dead": 316,
        "2": 316,
        "house": 283,
        "untitled": 282,
        "you": 279,
        "black": 274,
        "last": 269
    },
    "Western": {
        "west": 261,
        "trail": 227,
        "man": 172,
        "kid": 147,
        "texas": 124,
        "gun": 118,
        "wild": 109,
        "cowboy": 107,
        "law": 106,
        "last": 95
    },
    "Mystery": {
        "mystery": 247,
        "murder": 235,
        "night": 176,
        "man": 143,
        "house": 142,
        "2": 132,
        "dark": 130,
        "del": 126,
        "you": 119,
        "death": 116
    },
    "Horror": {
        "dead": 703,
        "night": 602,
        "2": 541,
        "house": 529,
        "blood": 528,
        "dark": 440,
        "horror": 395,
        "death": 354,
        "evil": 279,
        "hell": 253
    },
    "Music": {
        "live": 731,
        "music": 350,
        "story": 290,
        "rock": 263,
        "my": 236,
        "with": 231,
        "love": 218,
        "concert": 198,
        "you": 172,
        "life": 167
    },
    "Animation": {
        "movie": 301,
        "christmas": 217,
        "2": 179,
        "v": 151,
        "mult": 134,
        "kino.": 123,
        "vypusk": 120,
        "#": 117,
        "little": 114,
        "adventures": 106
    },
    "Musical": {
        "musical": 277,
        "love": 158,
        "me": 114,
        "del": 111,
        "christmas": 103,
        "my": 93,
        "you": 78,
        "music": 77,
        "di": 75,
        "live": 72
    },
    "Film-Noir": {
        "man": 28,
        "night": 26,
        "murder": 18,
        "big": 17,
        "house": 16,
        "city": 15,
        "woman": 15,
        "dark": 14,
        "street": 14,
        "story": 14
    },
    "Adult": {
        "girls": 241,
        "2": 240,
        "sex": 233,
        "love": 189,
        "hot": 114,
        "my": 102,
        "black": 91,
        "me": 90,
        "3": 87,
        "with": 79
    },
    "Reality-TV": {
        "vs": 144,
        "united": 45,
        "manchester": 44,
        "with": 38,
        "real": 26,
        "deadliest": 23,
        "film": 23,
        "catch:": 22,
        "fc": 19,
        "city": 17
    },
    "Talk-Show": {
        "with": 32,
        "show": 24,
        "talk": 9,
        "film": 8,
        "festa": 8,
        "interview": 7,
        "live": 7,
        "\u00e0": 7,
        "especial": 6,
        "petersburg": 6
    },
    "Game-Show": {
        "show": 5,
        "jogos": 5,
        "game": 4,
        "energia": 4,
        "bad": 3,
        "party": 2,
        "can't": 2,
        "smeg": 2,
        "ultimate": 2,
        "live!": 2
    },
    "Short": {
        "featuring": 2,
        "f\u00fcredi": 1,
        "annab\u00e1l": 1,
        "hockey:": 1,
        "canada's": 1,
        "national": 1,
        "game": 1,
        "mint": 1,
        "condition": 1,
        "beeldverhalen": 1
    }
}
