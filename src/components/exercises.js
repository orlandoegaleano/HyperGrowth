// Each muscle group has an array of exercise objects.
// Each exercise object has a name and a link prop that corresponds to a YouTube WatchID.
const exercises = {    
    Chest: [
        { name: 'Bench Press', link: 'gMgvBspQ9lk' },
        { name: 'Narrow Grip Bench Press', link: 'FiQUzPtS90E' },
        { name: 'Incline Bench Press', link: 'lJ2o89kcnxY' },
        { name: 'Incline Narrow Grip Bench Press', link: 'Zfi0KcIJi6c' },
        { name: 'Dumbbell Press', link: 'YQ2s_Y7g5Qk' },
        { name: 'Incline Dumbbell Press', link: '5CECBjd7HLQ' },
        { name: 'Push Up', link: 'mm6_WcoCVTA' },
        { name: 'Deficit Push-Up', link: 'gmNlqsE3Onc' },
        { name: 'Narrow Grip Push-Up', link: 'Lz1aFtuNvEQ' },
        { name: 'Machine Chest Press', link: 'NwzUje3z0qY' },
        { name: 'Smith Machine Bench Press', link: 'O5viuEPDXKY' },
        { name: 'Smith Machine Narrow Grip Bench Press', link: 'qf_FTh3QyYs' },
        { name: 'Incline Smith Machine Bench Press', link: '8urE8Z8AMQ4' },
        { name: 'Incline Smith Machine Narrow Grip Bench Press', link: 'qf_FTh3QyYs' }
    ],
    Back: [
        { name: 'Dumbbell Row', link: '5PoEksoJNaw' },
        { name: 'Cable Row', link: 'UCXxvVItLoM' },
        { name: 'Chest Supported Row', link: '0UBRfiO4zDs' },
        { name: 'Smith Machine Row', link: '3QcJggd_L24' },
        { name: 'Normal Grip Pullup', link: 'iWpoegdfgtc' },
        { name: 'Wide Grip Pullup', link: 'GRgWPT9XSQQ' },
        { name: 'Parallel Grip Pullup', link: 'XWt6FQAK5wM' },
        { name: 'Underhand Grip Pullup', link: '9JC1EwqezGY' },
        { name: 'Normal Grip Pulldown', link: 'EUIri47Epcg' },
        { name: 'Wide Grip Pulldown', link: 'YCKPD4BSD2E' },
        { name: 'Parallel Grip Pulldown', link: '--utaPT7XYQ' },
        { name: 'Underhand Grip Pulldown', link: 'VprlTxpB1rk' },
        { name: 'Assisted Normal Pullup', link: '8ygapPMYK1I' },
        { name: 'Assisted Wide Pullup', link: '0tiC6RUZL8Y' },
        { name: 'Assisted Underhand Pullup', link: 'L4ChTwrXTjc' }
    ],
    Biceps: [
        { name: 'Dumbbell Curl', link: 'yYB76DOBPsM' },
        { name: 'Incline Dumbbell Curl', link: 'aTYlqC_JacQ' },
        { name: 'Barbell Curl', link: 'JnLFSFurrqQ' },
        { name: 'Narrow Grip Barbell Curl', link: 'pUS6HBQjRmc' },
        { name: 'Cable Curl', link: 'nW7w5vG6IIc' },
        { name: 'Dumbbell Preacher Curl', link: 'fuK3nFvwgXk' },
        { name: 'Machine Preacher Curl', link: 'Ja6ZlIDONac' },
        { name: 'Dumbbell Hammer Curl', link: 'XOEL4MgekYE' }
    ],
    Shoulders: [
        { name: 'Dumbbell Upright Row', link: 'Ub6QruNKfbY' },
        { name: 'Barbell Upright Row', link: 'um3VVzqunPU' },
        { name: 'Cable Upright Row', link: 'qr3ziolhjvQ' },
        { name: 'Smith Machine Upright Row', link: 'QIpa-9dtkgA' },
        { name: 'Dumbbell Shoulder Press', link: 'HzIiNhHhhtA' },
        { name: 'Barbell Shoulder Press', link: 'IuzRCN6eG6Y' },
        { name: 'Machine Shoulder Press', link: 'WvLMauqrnK8' },
        { name: 'Smith Machine Shoulder Press', link: 'OLqZDUUD2b0' },
        { name: 'Dumbbell Front Raise', link: 'hRJ6tR5-if0' },
        { name: 'Barbell Front Raise', link: '_ikCPws1mbE' }
    ],
    Triceps: [
        { name: 'Dip', link: '4LA1kF7yCGo' },
        { name: 'Assisted Dip', link: 'yZ83t4mrPrI' },
        { name: 'Dumbbell Skullcrusher', link: 'jPjhQ2hsAds' },
        { name: 'Barbell Skullcrusher', link: 'l3rHYPtMUo8' },
        { name: 'Cable Pushdown', link: '6Fzep104f0s' },
        { name: 'Cable Pushdown with Rope', link: '-xa-6cQaZKY' },
        { name: 'Cable Overhead Extensions', link: '1u18yJELsh0' },
        { name: 'Cable Overhead Extensions with Rope', link: 'kqidUIf1eJE' }
    ],
    Glutes: [
        { name: 'Machine Glute Kickback', link: 'NLDBFtSNhqg' },
        { name: 'Barbell Hip Thrust', link: 'EF7jXP17DPE' },
        { name: 'Dumbbell Single Leg Hip Thrust', link: 'CSXVj047Ss4' },
        { name: 'Sumo Squat', link: 'wjw-4R5VR20' },
        { name: 'Cable Pull Through', link: 'pv8e6OSyETE' },
        { name: 'Deadlift', link: 'AweC3UaM14o' },
        { name: 'Deficit Deadlift', link: 'X-uKkAukJVA' },
        { name: 'Sumo Deadlift', link: 'xp1IeyTOB4U' }
    ],
    Quads: [
        { name: 'Leg Press', link: 'yZmx_Ac3880' },
        { name: 'Front Squat', link: 'HHxNbhP16UE' },
        { name: 'Narrow Stance Squat', link: '1IIPcUCKxcE' },
        { name: 'Smith Machine Forward Squat', link: '-eO_VydErV0' },
        { name: 'Machine Leg Extension', link: 'm0FOpMEgero' }
    ],    
    Hamstrings: [
        { name: '45 degree back raise', link: '5_ejbGfdAQE' },
        { name: 'Machine Leg Curl', link: 'Orxowest56U' },
        { name: 'Dumbbell Stiff Legged Deadlift', link: 'cYKYGwcg0U8' },
        { name: 'Barbell Stiff Legged Deadlift', link: 'CN_7cz3P-1U' },
        { name: 'Barbell Good Morning', link: 'dEJ0FTm-CEk' }
    ],
    Calves: [
        { name: 'Machine Calf Extension', link: 'N3awlEyTY98' },
        { name: 'Leg Press Calf Extension', link: 'KxEYX_cuesM' },
        { name: 'Smith Machine Calf Raises', link: 'hh5516HCu4k' },
        { name: 'Stair Calf Raises', link: '__qfDhdByMY' }
    ]
};
// List of all muscle groups based on the keys in the exercises object.
const exerciseDetails = Object.keys(exercises);

export { exercises, exerciseDetails };