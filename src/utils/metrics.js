export function signInDiary(diary) {
    window.ga('diaryTracker.set', {
        diary: diary
    });
    window.ga('diaryTracker.send', {
        hitType: 'event',
        eventCategory: 'Sign in',
        eventAction: 'click',
        eventLabel: diary
    });
}