'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { GoArrowUpRight } from 'react-icons/go';
import Image, { StaticImageData } from 'next/image';
import styles from './CardNav.module.css';
import useClickOutside from '@/hooks/useClickOutside';

type CardNavLink = {
    label: string;
    href: string;
    ariaLabel: string;
};

export type CardNavItem = {
    label: string;
    bgColor: string;
    textColor: string;
    links: CardNavLink[];
};

export interface CardNavProps {
    logo: string | StaticImageData;
    logoAlt?: string;
    items: CardNavItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
    logo,
    logoAlt = 'Logo',
    items,
    className = '',
    ease = 'power3.out',
    baseColor = '#fff',
    menuColor,
    buttonBgColor,
    buttonTextColor,
}) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    const calculateHeight = () => {
        if (!navRef.current) return 260;

        if (window.matchMedia('(max-width: 768px)').matches) {
            const contentEl = navRef.current.querySelector(`.${styles.cardNavContent}`) as HTMLElement;
            if (!contentEl) return 260;

            const prevStyles = {
                visibility: contentEl.style.visibility,
                pointerEvents: contentEl.style.pointerEvents,
                position: contentEl.style.position,
                height: contentEl.style.height,
            };

            contentEl.style.visibility = 'visible';
            contentEl.style.pointerEvents = 'auto';
            contentEl.style.position = 'static';
            contentEl.style.height = 'auto';
            contentEl.offsetHeight;

            const totalHeight = 60 + contentEl.scrollHeight + 16;

            // restore styles
            Object.assign(contentEl.style, prevStyles);

            return totalHeight;
        }

        return 260;
    };

    const createTimeline = () => {
        if (!navRef.current) return null;

        gsap.set(navRef.current, { height: 60, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });
        tl.to(navRef.current, { height: calculateHeight, duration: 0.15, ease });
        tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.15, ease, stagger: 0.08 }, '-=0.1');

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;
        return () => tl?.kill();
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            const newTl = createTimeline();
            if (!newTl) return;

            if (isExpanded) {
                gsap.set(navRef.current, { height: calculateHeight() });
                tlRef.current.kill();
                newTl.progress(1);
            }

            tlRef.current = newTl;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;

        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const closeMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;

        setIsHamburgerOpen(false);
        tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
        tl.reverse();
    };

    useClickOutside([{ contentRef: navRef, onClickOutside: closeMenu }]);

    const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) cardsRef.current[i] = el;
    };

    const isExternal = (url: string) => /^(https?:)?\/\//.test(url);

    return (
        <div className={`${styles['card-nav-container']} ${className}`}>
            <nav
                ref={navRef}
                className={`${styles['card-nav']} ${isExpanded ? styles.open : ''}`}
                style={{ backgroundColor: baseColor }}
            >
                <div className={styles['card-nav-top']}>
                    <div
                        className={`${styles['hamburger-menu']} ${isHamburgerOpen ? styles.open : ''}`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        tabIndex={0}
                        style={{ color: menuColor || '#000' }}
                    >
                        <div className={styles['hamburger-line']} />
                        <div className={styles['hamburger-line']} />
                    </div>

                    <div className={styles['logo-container']}>
                        <Image src={logo} alt={logoAlt} width={1024} height={1024} className={styles.logo} />
                    </div>
                </div>

                <div className={styles['card-nav-content']} aria-hidden={!isExpanded}>
                    {items.slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className={styles['nav-card']}
                            ref={setCardRef(idx)}
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        >
                            <div className={styles['nav-card-label']}>{item.label}</div>
                            <div className={styles['nav-card-links']}>
                                {item.links.map((lnk, i) =>
                                    isExternal(lnk.href) ? (
                                        <a
                                            key={`${lnk.label}-${i}`}
                                            className={styles['nav-card-link']}
                                            href={lnk.href}
                                            aria-label={lnk.ariaLabel}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <GoArrowUpRight className={styles['nav-card-link-icon']} aria-hidden="true" />
                                            {lnk.label}
                                        </a>
                                    ) : (
                                        <Link
                                            key={`${lnk.label}-${i}`}
                                            href={lnk.href}
                                            aria-label={lnk.ariaLabel}
                                            onClick={closeMenu}
                                            className={styles['nav-card-link']}
                                        >
                                            <GoArrowUpRight className={styles['nav-card-link-icon']} aria-hidden="true" />
                                            {lnk.label}
                                        </Link>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
