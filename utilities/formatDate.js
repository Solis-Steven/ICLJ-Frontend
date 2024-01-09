export const formatDate = (dateString) => {
    const sermonDate = new Date(dateString);

    const localSermonDate = new Date(sermonDate.toLocaleString('en-US', { timeZone: 'UTC' }));

    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    const dayOfWeek = daysOfWeek[localSermonDate.getUTCDay()];
    const dayOfMonth = localSermonDate.getUTCDate();
    const month = months[localSermonDate.getUTCMonth()];
    const year = localSermonDate.getUTCFullYear();

    return { dayOfWeek, dayOfMonth, month, year };
};
