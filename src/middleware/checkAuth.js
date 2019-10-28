export default function auth({ next, router }) {
    this.$firebase.auth().onAuthStateChanged(user => {
        window.uid = user ? user.uid : null;
        if (user.uid){
            return router.push({ name: 'home' });
        }
        // window.uid = user ? user.uid : null;
        // this.$router.push({name: window.uid ? 'home' : 'login'})
    });

    return next();
}