//Numerlogy
function processNumerologyInput(input) {
    // Numerology value mappings for letters
    const numerologyValues = {
        A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
        J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
        S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
    };

    // Extract input values
    const [name1, dob1, name2, dob2] = input.split(':').map((s, i) => i % 2 === 0 ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s);

    if (!name1 || !dob1 || !name2 || !dob2) {

        return 'Invalid input. Please provide names and dates of birth in the format "name1:dob1:name2:dob2".';
    }

    // Helper function to calculate numerology number
    function calculateNumber(value) {
        while (value > 9 && ![11, 22, 33].includes(value)) {
            value = value.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
        }
        return value;
    }

    // Calculate numerology numbers for names
    let sumName1 = 0, sumName2 = 0;
    for (let char of name1.toUpperCase()) {
        if (numerologyValues[char]) {
            sumName1 += numerologyValues[char];
        }
    }
    for (let char of name2.toUpperCase()) {
        if (numerologyValues[char]) {
            sumName2 += numerologyValues[char];
        }
    }
    const num1 = calculateNumber(sumName1);
    const num2 = calculateNumber(sumName2);

    // Calculate Life Path numbers from dates of birth
    const [year1, month1, day1] = dob1.split('-').map(Number);
    const [year2, month2, day2] = dob2.split('-').map(Number);
    const lifePath1 = calculateNumber(year1 + month1 + day1);
    const lifePath2 = calculateNumber(year2 + month2 + day2);

    // Calculate Destiny numbers
    const destiny1 = calculateNumber(sumName1);
    const destiny2 = calculateNumber(sumName2);

    // Calculate Soul Urge numbers
    const vowels = 'AEIOU';
    let sumSoulUrge1 = 0, sumSoulUrge2 = 0;
    for (let char of name1.toUpperCase()) {
        if (vowels.includes(char)) {
            sumSoulUrge1 += numerologyValues[char];
        }
    }
    for (let char of name2.toUpperCase()) {
        if (vowels.includes(char)) {
            sumSoulUrge2 += numerologyValues[char];
        }
    }
    const soulUrge1 = calculateNumber(sumSoulUrge1);
    const soulUrge2 = calculateNumber(sumSoulUrge2);

    // Compatibility descriptions
    const compatibility = {
        1: 'Leadership, independence, and individuality. \n - Pros: Strong leadership qualities, highly independent and self-reliant, ambitious and goal-oriented. \n - Cons: Can be domineering or controlling, may struggle with compromise, possible tendency towards selfishness. \n - Advice: Partners need to respect each other\'s independence and create a balance between leading and supporting. Open communication and mutual respect are key.',
        2: 'Sensitivity, balance, and harmony. \n - Pros: Highly empathetic and understanding, excellent at creating balance and harmony, good at mediating conflicts. \n - Cons: May be overly sensitive or emotional, can be indecisive, may avoid confrontation. \n - Advice: Focus on open and honest communication to prevent misunderstandings. Encourage each other to make decisions confidently and address issues directly.',
        3: 'Creativity, self-expression, and joy. \n - Pros: Highly creative and expressive, brings joy and enthusiasm into relationships, excellent communication skills. \n - Cons: May be prone to mood swings, can be overly expressive or dramatic, may struggle with responsibility. \n - Advice: Encourage each other\'s creative pursuits and find ways to balance joy with responsibility. Be patient and understanding during emotional ups and downs.',
        4: 'Stability, order, and responsibility. \n - Pros: Highly reliable and responsible, excellent at creating structure and order, strong sense of duty and commitment. \n - Cons: Can be rigid or inflexible, may struggle with spontaneity, possible tendency towards being overly serious. \n - Advice: Appreciate each other\'s reliability and work together to introduce flexibility and fun into the relationship. Balance structure with spontaneity.',
        5: 'Freedom, change, and adventure. \n - Pros: Highly adaptable and open to change, brings excitement and adventure into relationships, excellent at embracing new experiences. \n - Cons: May be restless or impulsive, can struggle with commitment, possible tendency towards being unpredictable. \n - Advice: Embrace each other\'s need for freedom and adventure while finding ways to create stability and commitment. Communicate openly about boundaries and expectations.',
        6: 'Love, family, and responsibility. \n - Pros: Highly nurturing and caring, excellent at creating a loving and supportive environment, strong sense of responsibility towards family. \n - Cons: Can be overly protective or controlling, may struggle with self-care, possible tendency towards taking on too much responsibility. \n - Advice: Support each other\'s nurturing qualities while encouraging self-care and independence. Balance family responsibilities with personal well-being.',
        7: 'Spirituality, introspection, and wisdom. \n - Pros: Highly introspective and wise, excellent at seeking deeper meaning and understanding, strong sense of spirituality. \n - Cons: Can be withdrawn or aloof, may struggle with emotional expression, possible tendency towards overthinking. \n - Advice: Appreciate each other\'s introspective nature and find ways to connect on a deeper level. Encourage open emotional expression and avoid overthinking.',
        8: 'Power, success, and material achievement. \n - Pros: Highly ambitious and goal-oriented, excellent at achieving success and material wealth, strong leadership qualities. \n - Cons: Can be overly focused on material success, may struggle with work-life balance, possible tendency towards being controlling. \n - Advice: Support each other\'s ambitions while finding ways to balance work and personal life. Emphasize the importance of emotional and relational success alongside material achievements.',
        9: 'Compassion, humanitarianism, and completion. \n - Pros: Highly compassionate and caring, excellent at seeing the bigger picture and working towards humanitarian goals, strong sense of empathy. \n - Cons: Can be overly idealistic, may struggle with practicality, possible tendency towards neglecting personal needs. \n - Advice: Encourage each other\'s compassionate nature while finding ways to balance idealism with practicality. Ensure personal needs are met alongside humanitarian goals.',
        11: 'Inspiration, idealism, and intuition. \n - Pros: Highly intuitive and inspirational, excellent at bringing visionary ideas into relationships, strong sense of idealism. \n - Cons: Can be overly idealistic or unrealistic, may struggle with practical implementation, possible tendency towards being overly sensitive. \n - Advice: Embrace each other\'s visionary qualities while finding ways to ground ideas in reality. Balance idealism with practicality and encourage open communication.',
        22: 'Master builder, large-scale plans, and potential. \n - Pros: Highly capable of achieving large-scale goals, excellent at creating and building substantial projects, strong sense of potential and ambition. \n - Cons: Can be overly focused on grand plans, may struggle with details, possible tendency towards being overly serious. \n - Advice: Support each other\'s grand visions while ensuring attention to detail and balance. Find ways to incorporate joy and relaxation into the pursuit of large-scale goals.',
        33: 'Master teacher, spiritual uplifting, and compassion. \n - Pros: Highly compassionate and spiritually uplifting, excellent at teaching and guiding others, strong sense of empathy and understanding. \n - Cons: Can be overly self-sacrificing, may struggle with setting boundaries, possible tendency towards neglecting personal needs. \n - Advice: Encourage each other\'s compassionate and teaching qualities while ensuring personal boundaries and self-care. Balance giving to others with taking care of personal well-being.'
    };

    const relationshipPotential = (num1 + num2) % 9 || 9;

    echo(`Numerology compatibility for ${name1} and ${name2}:
  
      ${name1}:
      - Core Number: ${num1} (${compatibility[num1]})
      - Life Path Number: ${lifePath1} (${compatibility[lifePath1]})
      - Destiny Number: ${destiny1} (${compatibility[destiny1]})
      - Soul Urge Number: ${soulUrge1} (${compatibility[soulUrge1]})
  
      ${name2}:
      - Core Number: ${num2} (${compatibility[num2]})
      - Life Path Number: ${lifePath2} (${compatibility[lifePath2]})
      - Destiny Number: ${destiny2} (${compatibility[destiny2]})
      - Soul Urge Number: ${soulUrge2} (${compatibility[soulUrge2]})
  
      Together, ${name1} and ${name2} have a relationship potential number ${relationshipPotential}, which signifies:
      ${compatibility[relationshipPotential]}.`);
}