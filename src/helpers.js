export default {
    transformTime: time => {
        let date = new Date(time);
        return date.toString();
    },
}