export default function auth({ next, router }) {
    if (window.uid){
        return router.push({ name: 'home' });
    }
    return next();
}