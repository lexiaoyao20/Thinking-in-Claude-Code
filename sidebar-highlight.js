// Sidebar scroll-spy: when current-header lands on a hidden nested item,
// bubble the highlight up to the nearest visible parent section link.
(function initSidebarHighlightModule(factory) {
    const api = factory();

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        api.initSidebarHighlight(document, window);
    }
})(function createSidebarHighlightApi() {
    const HIGHLIGHT_CLASS = 'current-header-visible';

    function findVisibleParentLink(current) {
        let li = current.closest('li');
        while (li) {
            const parentOl = li.parentElement;
            if (!parentOl) break;

            const parentLi = parentOl.closest('li');
            if (!parentLi) break;

            const parentLink = parentLi.querySelector(':scope > .chapter-link-wrapper > a, :scope > a');
            if (parentLink && parentLink.offsetParent !== null) {
                return parentLink;
            }

            li = parentLi;
        }

        return null;
    }

    function updateVisibleHighlight(root = document) {
        const current = root.querySelector('.on-this-page .current-header');
        const nextHighlight =
            current && current.offsetParent === null ? findVisibleParentLink(current) : null;

        root.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach(element => {
            if (element !== nextHighlight) {
                element.classList.remove(HIGHLIGHT_CLASS);
            }
        });

        if (nextHighlight && !nextHighlight.classList.contains(HIGHLIGHT_CLASS)) {
            nextHighlight.classList.add(HIGHLIGHT_CLASS);
        }

        return nextHighlight;
    }

    function initSidebarHighlight(root = document, win = window) {
        const sidebar = root.querySelector('.sidebar');
        if (!sidebar) return;

        let scheduled = false;
        const scheduleUpdate = () => {
            if (scheduled) return;
            scheduled = true;

            win.requestAnimationFrame(() => {
                scheduled = false;
                updateVisibleHighlight(root);
            });
        };

        const onThisPage = root.querySelector('.on-this-page');
        if (onThisPage && typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver(scheduleUpdate);
            observer.observe(onThisPage, {
                attributes: true,
                attributeFilter: ['class'],
                subtree: true,
            });
        }

        win.addEventListener('scroll', scheduleUpdate, { passive: true });
        win.addEventListener('hashchange', scheduleUpdate);
        win.addEventListener('resize', scheduleUpdate, { passive: true });

        if (root.readyState === 'loading') {
            root.addEventListener('DOMContentLoaded', scheduleUpdate, { once: true });
        } else {
            scheduleUpdate();
        }

        win.setTimeout(scheduleUpdate, 300);
    }

    return {
        HIGHLIGHT_CLASS,
        findVisibleParentLink,
        initSidebarHighlight,
        updateVisibleHighlight,
    };
});
