export default function auth({ next, router }) {
    if (!window.uid){
        return router.push({ name: 'login' });
    }
    return next();
}