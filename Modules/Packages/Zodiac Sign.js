//Zodiac Sign
function getZodiacSign(dateOfBirth) {
    const [year, month, day] = dateOfBirth.split('-').map(Number);

    const zodiacSigns = [
        { sign: 'Capricorn', start: '01-01', end: '01-19', details: 'Capricorns are responsible, disciplined, and have excellent self-control.' },
        { sign: 'Aquarius', start: '01-20', end: '02-18', details: 'Aquarians are independent, original, and humanitarian.' },
        { sign: 'Pisces', start: '02-19', end: '03-20', details: 'Pisceans are compassionate, artistic, and intuitive.' },
        { sign: 'Aries', start: '03-21', end: '04-19', details: 'Aries are courageous, determined, and natural-born leaders.' },
        { sign: 'Taurus', start: '04-20', end: '05-20', details: 'Taureans are reliable, patient, and devoted.' },
        { sign: 'Gemini', start: '05-21', end: '06-20', details: 'Geminis are curious, adaptable, and excellent communicators.' },
        { sign: 'Cancer', start: '06-21', end: '07-22', details: 'Cancers are nurturing, sensitive, and deeply intuitive.' },
        { sign: 'Leo', start: '07-23', end: '08-22', details: 'Leos are generous, confident, and natural-born leaders.' },
        { sign: 'Virgo', start: '08-23', end: '09-22', details: 'Virgos are practical, loyal, and hardworking.' },
        { sign: 'Libra', start: '09-23', end: '10-22', details: 'Libras are diplomatic, social, and value harmony.' },
        { sign: 'Scorpio', start: '10-23', end: '11-21', details: 'Scorpios are passionate, determined, and assertive.' },
        { sign: 'Sagittarius', start: '11-22', end: '12-21', details: 'Sagittarians are adventurous, optimistic, and freedom-loving.' },
        { sign: 'Capricorn', start: '12-22', end: '12-31', details: 'Capricorns are responsible, disciplined, and have excellent self-control.' },
    ];

    const dateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const sign = zodiacSigns.find(({ start, end }) => dateStr >= start && dateStr <= end);
    if (sign) {
        echo(`You are a ${sign.sign}. ${sign.details}`);
    } else {

        echo('Invalid date of birth.');
    }
}