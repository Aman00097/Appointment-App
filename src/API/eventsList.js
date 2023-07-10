const today = new Date();
const eventsList = [
    {
        id: 101,
        patientName: 'Milka',
        doctorName: 'Nembo Lukeni',
        department: 'General Medicine',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 8), 11),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 8), 12),
        symptom: 'Swelling or bruising over a bone, Pain in the injured area',
        title: 'Milka'
    },
    {
        id: 102,
        patientName: 'Janet',
        doctorName: 'Amelia Edwards',
        department: 'Orthopedics',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 15), 8),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 15), 10),
        symptom: 'Physical aches or pain, Memory difficulties or personality changes',
        title: 'Janet'
    },
    {
        id: 103,
        patientName: 'Mercy',
        doctorName: 'Amelia Edwards',
        department: 'Dermatology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 5), 15),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 5), 16),
        symptom: 'Outbreak of swollen, pale red bumps or plaques',
        title: 'Mercy'
    },
    {
        id: 104,
        patientName: 'Richa',
        doctorName: 'Mollie Cobb',
        department: 'Neurology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 2), 15),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 2), 16),
        symptom: 'Outbreak of swollen, pale red bumps or plaques',
        title: 'Richa'
    },
    {
        id: 104,
        patientName: 'Adams',
        doctorName: 'Yara Barros',
        department: 'Diabetology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 1), 12),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 1), 13),
        symptom: 'Decreased energy, Chronic fatigue, Difficulty concentrating',
        title: 'Adams'
    },
    {
        id: 105,
        patientName: 'Milka',
        doctorName: 'Mollie Cobb',
        department: 'Cardiology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 0), 15),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 0), 17),
        symptom: 'A rash, which might be painful or itchy',
        title: 'Milka'
    },
    {
        id: 106,
        patientName: 'Janet',
        doctorName: 'Amelia Edwards',
        department: 'Dermatology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 3), 10),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 3), 11),
        symptom: 'Shortness of breath, Swollen feet or ankles',
        title: 'Janet'
    },
    {
        id: 107,
        patientName: 'Laura',
        doctorName: 'Nout Golstein',
        department: 'Cardiology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 3), 18),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 3), 20),
        symptom: 'Frequent squinting, Eye fatigue or strain',
        title: 'Laura'
    },
    {
        id: 108,
        patientName: 'Milka',
        doctorName: 'Nout Golstein',
        department: 'Orthopedics',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 3), 20),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 3), 21),
        symptom: 'Decreased energy, Chronic fatigue, Difficulty concentrating',
        title: 'Milka'
    },
    {
        id: 109,
        patientName: 'Richa',
        doctorName: 'Yara Barros',
        department: 'Orthopedics',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 0), 9),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 0), 10),
        symptom: 'Nasal congestion, runny nose.',
        title: 'Milka'
    },
    {
        id: 110,
        patientName: 'Mercy',
        doctorName: 'Nout Golstein',
        department: 'Diabetology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 1), 2),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 1), 3),
        symptom: 'Decreased energy, Chronic fatigue, Difficulty concentrating',
        title: 'Mercy'
    },
    {
        id: 111,
        patientName: 'Laura',
        doctorName: 'Nembo Lukeni',
        department: 'Cardiology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 10), 2),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 10), 3),
        symptom: 'Fluid buildup from being overweight',
        title: 'Laura'
    },
    {
        id: 112,
        patientName: 'Laura',
        doctorName: 'Nout Golstein',
        department: 'Cardiology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 0), 2),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() - 0), 3),
        symptom: 'Fluid buildup from being overweight',
        title: 'Laura'
    },
    {
        id: 113,
        patientName: 'Adams',
        doctorName: 'Yara Barros',
        department: 'General Medicine',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 7), 6),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 7), 8),
        symptom: 'Scaly or rough skin, Peeling skin, open sores or lesions',
        title: 'Adams'
    },
    {
        id: 114,
        patientName: 'Janet',
        doctorName: 'Paul Walker',
        department: 'Dermatology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 3), 13),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 3), 14),
        symptom: 'Scaly or rough skin, Peeling skin, open sores or lesions',
        title: 'Janet'
    },
    {
        id: 115,
        patientName: 'Milka',
        doctorName: 'Mollie Cobb',
        department: 'Neurology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 3), 17),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 3), 19),
        symptom: 'A pulsating feeling in the head, sensitivity to sound and light',
        title: 'Milka'
    },
    {
        id: 116,
        patientName: 'Richa',
        doctorName: 'Amelia Edwards',
        department: 'Orthopedics',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 5), 17),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 5), 19),
        symptom: 'Partial or complete paralysis, Muscle weakness',
        title: 'Richa'
    },
    {
        id: 117,
        patientName: 'Mercy',
        doctorName: 'Nembo Lukeni',
        department: 'General Medicine',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 10), 8),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 10), 10),
        symptom: 'Urinating often, Extreme fatigue, Blurry vision',
        title: 'Mercy'
    },
    {
        id: 118,
        patientName: 'Laura',
        doctorName: 'Nout Golstein',
        department: 'Cardiology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 5), 8),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 5), 10),
        symptom: 'Decreased urine output',
        title: 'Laura'
    },
    {
        id: 119,
        patientName: 'Richa',
        doctorName: 'Yara Barros',
        department: 'Diabetology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 3), 2),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 3), 5),
        symptom: 'Gasping for air during sleep',
        title: 'Richa'
    },
    {
        id: 120,
        patientName: 'Janet',
        doctorName: 'Paul Walker',
        department: 'Diabetology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 3), 6),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 3), 9),
        symptom: 'Urinating often, Extreme fatigue, Blurry vision',
        title: 'Janet'
    },
    {
        id: 121,
        patientName: 'Janet',
        doctorName: 'Yara Barros',
        department: 'Diabetology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 3), 12),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 3), 13),
        symptom: 'Fluid buildup from being overweight',
        title: 'Janet'
    },
    {
        id: 122,
        patientName: 'Mercy',
        doctorName: 'Yara Barros',
        department: 'Orthopedics',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 5), 12),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 5), 13),
        symptom: 'Severe, sudden eye pain',
        title: 'Mercy'
    },
    {
        id: 123,
        patientName: 'Milka',
        doctorName: 'Nout Golstein',
        department: 'Cardiology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 2), 18),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 2), 20),
        symptom: 'sudden eye pain',
        title: 'Milka'
    },
    {
        id: 124,
        patientName: 'Mercy',
        doctorName: 'Amelia Edwards',
        department: 'Dermatology',
        start: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 0), 19),
        end: new Date((today.getFullYear()), (today.getMonth()), (today.getDate() + 0), 21),
        symptom: 'sudden eye pain',
        title: 'Mercy'
    }
]


export default eventsList;