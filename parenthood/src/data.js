// Días festivos (no computan días laborables)
export const countryHolidays = [
    { date: '01/01/2023', description: 'Año Nuevo' }, 
    { date: '06/01/2023', description: 'Reyes' }, 
    { date: '06/06/2022', description: 'Segunda Pascua' }, 
    { date: '07/04/2023', description: 'Viernes Santo' }, 
    { date: '10/04/2023', description: 'Lunes de Pascua' }, 
    { date: '01/05/2023', description: 'Día del Trabajador' }, 
    { date: '24/06/2023', description: 'Sant Joan' }, 
    { date: '15/08/2023', description: 'Asunción' }, 
    { date: '11/09/2023', description: 'La Diada' }, 
    { date: '12/10/2023', description: 'El Pilar' }, 
    { date: '01/11/2023', description: 'Todos los Santos' }, 
    { date: '06/12/2023', description: 'La Constitución' }, 
    { date: '08/12/2023', description: 'Inmaculada' }, 
    { date: '25/12/2023', description: 'Navidad' }, 
    { date: '26/12/2023', description: 'Sant Esteve' }, 
    { date: '01/01/2024', description: 'Año Nuevo' }, 
    { date: '06/01/2024', description: 'Reyes' },
];

// Datos del plan de baja
export const planningData = [
    {
        id: 1,
        title: "Semanas obligatorias Diego y Candela",
        subject: ["Candela", "Diego"],
        time: "6 weeks",
        color: '#F4C84C',
    },
    
    {
        id: 2,
        title: "Permiso maternidad Candela",
        subject: ["Candela"],
        time: "10 weeks",
        color: '#E99489',
    },
    
    {
        id: 3,
        title: "Periodo lactancia Candela",
        subject: ["Candela"],
        time: "15 days",
        color: '#E9B289',
    },

    {
        id: 4,
        title: "Día vacaciones Candela",
        subject: ["Candela"],
        time: "1 days",
        color: '#F4C84C',
    },
    
    {
        id: 5,
        title: "Periodo paternidad Diego",
        subject: ["Diego"],
        time: "10 weeks",
        color: '#17BEBB',
    },

    {
        id: 6,
        title: "Periodo lactancia Diego",
        subject: ["Diego"],
        time: "14 days",
        color: '#8bdeb8',
    }
];