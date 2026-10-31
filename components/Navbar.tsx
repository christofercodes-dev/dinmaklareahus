
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";

const links = [
    { label: "Fastigheter", href: "/fastigheter", number: "01" },
    { label: "Om oss", href: "/om-oss", number: "02" },
    { label: "Sälj med oss", href: "/sell-page", number: "03" },
    { label: "Kontakt", href: "/kontakt", number: "04" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    const closeMenu = () => setOpen(false);

    const pathname = usePathname();

    const forceScrolled = [
        "/fastigheter",
        "/sell-page",
        "/kontakt",
        "/om-oss",
        "/maklaren"
    ].includes(pathname);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(forceScrolled || window.scrollY > 20);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [forceScrolled, pathname]);

    return (
        <header
            className={[
                styles.navbar,
                scrolled ? styles.scrolled : "",
                open ? styles.menuIsOpen : "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className={styles.inner}>
                <nav className={styles.desktopLeft} aria-label="Huvudmeny">
                    <Link className={styles.navLink} href="/fastigheter">
                        Fastigheter
                    </Link>
                    <Link className={styles.navLink} href="/om-oss">
                        Om oss
                    </Link>
                </nav>

                <Link
                    href="/"
                    className={styles.logo}
                    aria-label="Till startsidan"
                    onClick={closeMenu}
                >
                    <Image
                        src="/images/Logga-vit.png"
                        alt="Logotyp"
                        width={168}
                        height={48}
                        priority
                        className={styles.logoImage}
                    />
                </Link>

                <nav className={styles.desktopRight} aria-label="Fler länkar">
                    <Link className={styles.navLink} href="/sell-page">
                        Sälj med oss
                    </Link>
                    <Link className={styles.contactLink} href="/kontakt">
                        Kontakt
                    </Link>
                </nav>

                <button
                    type="button"
                    className={styles.menuButton}
                    aria-label={open ? "Stäng meny" : "Öppna meny"}
                    aria-expanded={open}
                    aria-controls="mobile-navigation"
                    onClick={() => setOpen((current) => !current)}
                >
                    <span
                        className={[
                            styles.menuIcon,
                            open ? styles.iconOpen : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        aria-hidden="true"
                    >
                        <span />
                        <span />
                        <span />
                    </span>
                </button>
            </div>

            <button
                type="button"
                className={[
                    styles.mobileBackdrop,
                    open ? styles.mobileBackdropVisible : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                aria-label="Stäng meny"
                tabIndex={open ? 0 : -1}
                onClick={closeMenu}
            />

            <aside
                id="mobile-navigation"
                className={[
                    styles.mobileMenu,
                    open ? styles.mobileMenuOpen : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                aria-label="Mobilmeny"
                aria-hidden={!open}
                inert={!open}
            >
                <div className={styles.mobileMenuContent}>
                    <div className={styles.mobileMenuTop}>
                        <span className={styles.mobileEyebrow}>MENY</span>

                    </div>

                    <nav className={styles.mobileLinks} aria-label="Mobilnavigation">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={styles.mobileLink}
                                onClick={closeMenu}
                            >
                                <span className={styles.mobileLinkNumber}>
                                    {link.number}
                                </span>
                                <span className={styles.mobileLinkLabel}>
                                    {link.label}
                                </span>

                            </Link>
                        ))}
                    </nav>

                    <div className={styles.mobileFooter}>
                        <span>ÅHUS. ÖSTERLEN</span>
                        <Link href="/kontakt" onClick={closeMenu}>
                            Kontakta oss
                        </Link>
                    </div>
                </div>
            </aside>
        </header>
    );
}
