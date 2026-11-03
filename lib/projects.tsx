// Every project, in the order the projects page shows them (newest first). The home page shows the five in HOME,
// in that order. `motif` is the little animation that plays on the dotted line when you hover a project.
import type { CSSProperties, ReactNode } from 'react'
import type { StaticImageData } from 'next/image'
import advolveCardImg from '@/public/media/advolve-card.png'
import ensemblecrowdImg from '@/public/projects/ensemblecrowd.jpg'
import echosignImg from '@/public/projects/echosign.png'
import flightTelemetryImg from '@/public/projects/flight-telemetry.jpg'
import intimeImg from '@/public/projects/intime.png'
import autonomousNavImg from '@/public/projects/autonomous-nav.jpeg'
import gustyGardenImg from '@/public/projects/gusty-garden.png'

export type Media =
  | { kind: 'img'; src: StaticImageData; alt: string }
  | { kind: 'video'; src: string; w: number; h: number; poster?: string }

export interface Project {
  id: string
  name: string
  date: string
  sub: string
  dim: string
  points: string[]
  tags: string[]
  link?: { href: string; label: string }
  motif: ReactNode
  media: Media
  caption: string
  /** polaroid tilt, its width (large layout / narrow screens), and the card's min height to fit it */
  tilt: string
  wl: number
  ws: number
  ph: number
  phs: number
  /** how it reads in the home page's list, if it's there */
  home?: { name: string; date: string; desc: string; dim?: string; caption: string; tilt: string; width: number; media: Media }
}

export const TAGS: Record<string, ReactNode> = {
  "JavaScript": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 128 128"><path fill="#F7DF1E" d="M2 2h124v124H2z"></path><path fill="#000" d="M89.5 108.3c3.1 5 7.1 8.7 14.2 8.7 6 0 9.8-3 9.8-7.1 0-4.9-3.9-6.7-10.5-9.5l-3.6-1.5c-10.4-4.4-17.3-10-17.3-21.7 0-10.8 8.2-19 21.1-19 9.2 0 15.7 3.2 20.5 11.5l-11.2 7.2c-2.5-4.4-5.1-6.1-9.3-6.1-4.2 0-6.9 2.7-6.9 6.1 0 4.3 2.7 6 8.9 8.7l3.6 1.5c12.2 5.2 19.1 10.6 19.1 22.6 0 13-10.2 20.1-23.9 20.1-13.4 0-22.1-6.4-26.3-14.8l11.8-6.7zM52.7 110c2.4 4.2 4.5 7.8 9.7 7.8 5 0 8.1-1.9 8.1-9.4V62.9h14.5v45.7c0 15.5-9.1 22.5-22.3 22.5-12 0-18.9-6.2-22.4-13.6l12.4-7.5z"></path></svg>,
  "WebGL": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 128 128"><rect fill="#1a1a1a" width="128" height="128" rx="14"></rect><text x="64" y="81" textAnchor="middle" fill="#E5312E" fontSize="48" fontWeight="700" fontFamily="system-ui, sans-serif">GL</text></svg>,
  "Python": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 256 255"><defs><linearGradient id="lg-Python-pythonBlue" x1="12.959%" x2="79.639%" y1="12.039%" y2="78.201%"><stop offset="0%" stopColor="#387EB8"></stop><stop offset="100%" stopColor="#366994"></stop></linearGradient><linearGradient id="lg-Python-pythonYellow" x1="19.128%" x2="90.742%" y1="20.579%" y2="88.429%"><stop offset="0%" stopColor="#FFE052"></stop><stop offset="100%" stopColor="#FFC331"></stop></linearGradient></defs><path fill="url(#lg-Python-pythonBlue)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"></path><path fill="url(#lg-Python-pythonYellow)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"></path></svg>,
  "TypeScript": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 512 512"><rect fill="#3178c6" height="512" rx="50" width="512"></rect><path clipRule="evenodd" d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z" fill="#fff" fillRule="evenodd"></path></svg>,
  "Next.js": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 128 128"><circle cx="64" cy="64" r="64" fill="#000"></circle><path fill="url(#lg-Next-g1)" d="M106.3 115.6L49.5 42.7H42v42.6h6v-32l49.4 64a63.7 63.7 0 008.9-1.7z"></path><path fill="url(#lg-Next-g2)" d="M86 42.7h-6.4v42.6H86z"></path><defs><linearGradient id="lg-Next-g1" x1="54" y1="83.5" x2="95" y2="123" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"></stop><stop offset="1" stopColor="#fff" stopOpacity="0"></stop></linearGradient><linearGradient id="lg-Next-g2" x1="82.8" y1="42.7" x2="82.7" y2="74" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"></stop><stop offset="1" stopColor="#fff" stopOpacity="0"></stop></linearGradient></defs></svg>,
  "Cloudflare": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 128 128"><circle fill="#F38020" cx="50" cy="64" r="24"></circle><circle fill="#F38020" cx="80" cy="57" r="19"></circle><circle fill="#FAAE40" cx="99" cy="75" r="13"></circle><rect fill="#F38020" x="26" y="68" width="82" height="20" rx="10"></rect></svg>,
  "PyTorch": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 128 128"><path fill="#EE4C2C" d="M64 8L46 26a38 38 0 1 0 54 0l-9 9a25 25 0 1 1-36 0L64 26z"></path><circle fill="#EE4C2C" cx="83" cy="31" r="6"></circle></svg>,
  "PixiJS": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 128 128"><rect fill="#E72264" width="128" height="128" rx="14"></rect><text x="64" y="84" textAnchor="middle" fill="#fff" fontSize="50" fontWeight="700" fontFamily="system-ui, sans-serif">px</text></svg>,
  "C++": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 128 128"><path fill="#659AD2" d="M115.4 30.7L67.1 2.9c-1.9-1.1-4.3-1.1-6.2 0L12.6 30.7c-1.9 1.1-3.1 3.2-3.1 5.3v55.7c0 2.2 1.2 4.2 3.1 5.3l48.3 27.9c1.9 1.1 4.3 1.1 6.2 0l48.3-27.9c1.9-1.1 3.1-3.2 3.1-5.3V36c0-2.2-1.2-4.2-3.1-5.3zM64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l-13 7.5c-1.8-3.5-5.5-5.8-9.7-5.8-6.1 0-11 4.9-11 11s4.9 11 11 11c4.2 0 7.8-2.3 9.7-5.8l13 7.5c-4.2 7.5-12.2 12.6-21.3 12.6z"></path><path fill="#659AD2" d="M99.5 65h-5v-5h-4v5h-5v4h5v5h4v-5h5zM117.5 65h-5v-5h-4v5h-5v4h5v5h4v-5h5z"></path></svg>,
  "OpenCV": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 128 128"><circle cx="40" cy="45" r="28" fill="#ff0000" opacity="0.9"></circle><circle cx="88" cy="45" r="28" fill="#00ff00" opacity="0.9"></circle><circle cx="64" cy="88" r="28" fill="#0000ff" opacity="0.9"></circle><circle cx="64" cy="58" r="12" fill="#fff"></circle><circle cx="64" cy="58" r="6" fill="#333"></circle></svg>,
  "Gemini AI": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 128 128"><rect fill="#1a1a2e" width="128" height="128" rx="12"></rect><defs><linearGradient id="lg-Gemini-gemini-grad-a" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1C7CEF"></stop><stop offset="50%" stopColor="#8B63D1"></stop><stop offset="100%" stopColor="#D9594C"></stop></linearGradient><linearGradient id="lg-Gemini-gemini-grad-b" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#1C7CEF"></stop><stop offset="50%" stopColor="#8B63D1"></stop><stop offset="100%" stopColor="#D9594C"></stop></linearGradient></defs><path fill="url(#lg-Gemini-gemini-grad-a)" d="M64 14C64 40.5 43.1 62 18 64c25.1 2 46 23.5 46 50 0-26.5 20.9-48 46-50C84.9 62 64 40.5 64 14z"></path></svg>,
  "Solana": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 128 128"><rect fill="#0e0e2c" width="128" height="128" rx="12"></rect><defs><linearGradient id="lg-Solana-solana-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#9945FF"></stop><stop offset="100%" stopColor="#14F195"></stop></linearGradient></defs><path fill="url(#lg-Solana-solana-grad)" d="M28 38h60l12-12H40L28 38z"></path><path fill="url(#lg-Solana-solana-grad)" d="M100 58H40L28 70h60l12-12z"></path><path fill="url(#lg-Solana-solana-grad)" d="M28 102h60l12-12H40L28 102z"></path></svg>,
  "React": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 128 128"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"></circle><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5-13.8-4.7-22.1-10.8-22.1-15.6zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4.7 22.1 10.8 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"></path></g></svg>,
  "SQL": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 24 24"><path fill="#00758F" d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.42 0 8 1.34 8 3s-3.58 3-8 3-8-1.34-8-3 3.58-3 8-3zm8 14c0 1.66-3.58 3-8 3s-8-1.34-8-3v-3.08c1.86 1.26 5.2 2.08 8 2.08s6.14-.82 8-2.08V18zm0-5c0 1.66-3.58 3-8 3s-8-1.34-8-3V9.92c1.86 1.26 5.2 2.08 8 2.08s6.14-.82 8-2.08V13z"></path></svg>,
  "Flask": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 256 256"><path fill="#44B78B" d="M168.146 221.679c-7.393 4.844-52.916 20.663-79.263 2.514-15.723-10.837-25.565-33.099-25.637-57.938-.082-28.483 12.31-46.619 24.855-65.155 9.483-14.015 19.287-28.51 24.287-48.13 1.315-5.16 2.27-10.612 2.903-16.295h26.086c.705 5.7 1.751 11.168 3.178 16.34 5.435 19.7 15.728 34.232 25.661 48.252 13.192 18.613 25.65 36.195 25.65 65.05 0 26.038-11.437 45.688-27.72 55.362z"></path><path fill="#000" d="M141.377 36.675V12.089c0-6.676-5.412-12.089-12.089-12.089h-2.576c-6.676 0-12.089 5.413-12.089 12.089v24.586h26.754z" opacity=".1"></path><path fill="#000" d="M145.5 44.939H110.5a4.5 4.5 0 0 1 0-9h35a4.5 4.5 0 0 1 0 9z"></path></svg>,
  "Canvas API": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 128 128"><rect fill="#E44D26" width="128" height="128" rx="8"></rect><path fill="#FFF" d="M34 94V34h20v20h20V34h20v60H74V74H54v20H34z"></path><circle fill="#F7DF1E" cx="94" cy="94" r="16"></circle></svg>,
  "Java": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 256 346"><path fill="#5382A1" d="M82.554 267.473s-13.198 7.675 9.393 10.272c27.369 3.122 41.356 2.675 71.517-3.034 0 0 7.93 4.972 19.003 9.279-67.611 28.977-153.019-1.679-99.913-16.517zm-8.262-37.814s-14.803 10.958 7.805 13.296c29.236 3.016 52.324 3.263 92.276-4.43 0 0 5.526 5.602 14.215 8.666-81.747 23.904-172.798 1.885-114.296-17.532z"></path><path fill="#E76F00" d="M143.942 165.515c16.66 19.18-4.377 36.44-4.377 36.44s42.301-21.837 22.874-49.183c-18.144-25.5-32.059-38.172 43.268-81.858 0 0-118.238 29.53-61.765 94.6z"></path><path fill="#5382A1" d="M233.364 295.442s9.767 8.047-10.757 14.273c-39.026 11.823-162.432 15.393-196.714.471-12.323-5.36 10.787-12.8 18.056-14.362 7.581-1.644 11.914-1.337 11.914-1.337-13.705-9.655-88.583 18.957-38.034 27.15 137.853 22.356 251.292-10.066 215.535-26.195zM88.9 190.48s-62.771 14.908-22.228 20.323c17.118 2.292 51.243 1.774 83.03-.89 25.978-2.19 52.063-6.85 52.063-6.85s-9.16 3.923-15.787 8.448c-63.744 16.765-186.886 8.966-151.435-8.183 29.981-14.492 54.358-12.848 54.358-12.848zm112.605 62.942c64.8-33.672 34.839-66.03 13.927-61.67-5.126 1.066-7.411 1.99-7.411 1.99s1.903-2.98 5.537-4.27c41.37-14.545 73.187 42.897-13.355 65.647 0 .001 1.003-.895 1.302-1.697z"></path><path fill="#E76F00" d="M162.439.371s35.887 35.9-34.037 91.101c-56.071 44.282-12.786 69.53-.023 98.377-32.73-29.53-56.75-55.526-40.635-79.762C111.395 74.612 176.918 57.393 162.439.37z"></path><path fill="#5382A1" d="M95.268 344.665c62.199 3.982 157.712-2.209 159.974-31.64 0 0-4.348 11.158-51.404 20.018-53.088 9.99-118.564 8.824-157.399 2.421.001 0 7.95 6.58 48.83 9.201z"></path></svg>,
  "PID": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 24 24"><path fill="#6B7280" d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"></path></svg>,
  "JavaFX": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 128 128"><defs><linearGradient id="lg-JavaFx-javafx-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#5382A1"></stop><stop offset="100%" stopColor="#E76F00"></stop></linearGradient></defs><rect fill="url(#lg-JavaFx-javafx-grad)" width="128" height="128" rx="12"></rect><text x="64" y="78" textAnchor="middle" fill="#FFF" fontSize="42" fontWeight="bold" fontFamily="system-ui">FX</text></svg>,
  "Cryptography": <svg className="lg" width="13" height="13" aria-hidden="true" viewBox="0 0 128 128"><circle fill="#1a1a2e" cx="64" cy="64" r="60"></circle><path fill="#00d4aa" d="M64 24c-22.1 0-40 17.9-40 40s17.9 40 40 40 40-17.9 40-40-17.9-40-40-40zm0 70c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z"></path><path fill="#00d4aa" d="M64 44v12l10 8-10 8v12l20-16v-8z"></path><path fill="#00d4aa" d="M64 44v12l-10 8 10 8v12l-20-16v-8z"></path></svg>,
}

export const PROJECTS: Project[] = [
  {
    id: "duct-flow-lab",
    name: "duct flow lab",
    date: "oct 2026",
    sub: "live CFD of air through HVAC duct fittings, solved on your GPU in the browser",
    dim: "up to 61% less pressure loss",
    points: ["a lattice-Boltzmann solver with LES turbulence, written as WebGL2 shaders", "20 fitting pairs at the same airflow: tee vs wye, one 90° elbow vs two 45°s, turning vanes"],
    tags: ["JavaScript", "WebGL", "Python"],
    motif: (
      <span className="stage m-flow"><i className="fw" style={{ "--d": "0s" } as CSSProperties}></i><i className="fw" style={{ "--d": ".14s" } as CSSProperties}></i><i className="fw" style={{ "--d": ".28s" } as CSSProperties}></i><svg className="sw" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6 7a1 1 0 1 1 2 0a2.5 2.5 0 1 1 -5 0a4 4 0 1 1 8 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"></path></svg></span>
    ),
    media: { kind: 'video', src: "/media/duct-tee-wye.mp4", w: 620, h: 462 },
    caption: "eddies vs a clean split",
    tilt: "3deg", wl: 300, ws: 232, ph: 221, phs: 0,
    home: {
      name: "duct flow lab", date: "oct '26",
      desc: "live GPU fluid sim of air through HVAC duct fittings",
      dim: "up to 61% less pressure loss",
      caption: "eddies vs a clean split", tilt: "3deg", width: 232,
      media: { kind: 'video', src: "/media/duct-tee-wye.mp4", w: 620, h: 462 },
    },
  },
  {
    id: "advolve",
    name: "advolve",
    date: "sep 2026",
    sub: "ad creatives that evolve, built by four of us",
    dim: "hack the north 2026",
    points: ["each ad is an 8-gene genome (hook, visual, emotion, CTA…), bred by crossover and mutation over N rounds", "AI generates the image and video takes; the TRIBE brain-response model scores them on a GPU worker"],
    tags: ["TypeScript", "Next.js", "Cloudflare", "PyTorch"],
    motif: (
      <span className="stage m-gen"><span className="gn"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span className="gl">gen 08</span></span>
    ),
    media: { kind: 'img', src: advolveCardImg, alt: "The Advolve logo" },
    caption: "hack the north 2026",
    tilt: "-2deg", wl: 300, ws: 232, ph: 166, phs: 0,
    home: {
      name: "advolve", date: "sep '26",
      desc: "ads that evolve, scored by a brain-response model",
      dim: "hack the north 2026",
      caption: "hack the north 2026", tilt: "-2deg", width: 232,
      media: { kind: 'img', src: advolveCardImg, alt: "" },
    },
  },
  {
    id: "aeroqueue",
    name: "aeroqueue",
    date: "aug 2026",
    sub: "which way of boarding a plane is actually fastest? a browser simulation",
    dim: "steffen beats back-to-front by 33%",
    points: ["a discrete-event, agent-based 737 MAX 8 with 1,000 seeded Monte Carlo runs per method", "back-to-front came out slower than boarding at random; a genetic algorithm hunts for better orders"],
    tags: ["TypeScript", "Next.js", "PixiJS"],
    motif: (
      <span className="stage m-board"><i className="pa" style={{ "--to": "86%", "--d": "0s" } as CSSProperties}></i><i className="pa" style={{ "--to": "68%", "--d": "0.16s" } as CSSProperties}></i><i className="pa" style={{ "--to": "50%", "--d": "0.32s" } as CSSProperties}></i><i className="pa" style={{ "--to": "32%", "--d": "0.48s" } as CSSProperties}></i></span>
    ),
    media: { kind: 'video', src: "/media/aeroqueue.mp4", w: 640, h: 560, poster: "/media/aeroqueue-poster.png" },
    caption: "back-to-front loses to random",
    tilt: "2deg", wl: 300, ws: 232, ph: 259, phs: 200,
  },
  {
    id: "ensemble",
    name: "ensemble",
    date: "jul 2026",
    sub: "a phone orchestra you conduct with your hands",
    dim: "hack the 6ix finalist",
    points: ["synced 200+ audience phones with a Python WebSocket server and NTP-style clocks", "two fine-tuned Qwen models compose each bar in 453 ms on a dedicated H200"],
    tags: ["Python", "C++", "JavaScript", "OpenCV"],
    motif: (
      <span className="stage m-notes"><svg className="px nt" style={{ left: "16%" }} width="12" height="12" viewBox="0 0 9 9"><path fill="currentColor" d="M3 0h6v1h-6zM3 1h6v1h-6zM3 2h1v1h-1zM8 2h1v1h-1zM3 3h1v1h-1zM8 3h1v1h-1zM3 4h1v1h-1zM8 4h1v1h-1zM1 5h3v1h-3zM6 5h3v1h-3zM0 6h4v1h-4zM5 6h4v1h-4zM0 7h4v1h-4zM5 7h4v1h-4zM1 8h2v1h-2zM6 8h2v1h-2z"></path></svg><svg className="px nt" style={{ left: "42%" }} width="12" height="12" viewBox="0 0 9 9"><path fill="currentColor" d="M3 0h6v1h-6zM3 1h6v1h-6zM3 2h1v1h-1zM8 2h1v1h-1zM3 3h1v1h-1zM8 3h1v1h-1zM3 4h1v1h-1zM8 4h1v1h-1zM1 5h3v1h-3zM6 5h3v1h-3zM0 6h4v1h-4zM5 6h4v1h-4zM0 7h4v1h-4zM5 7h4v1h-4zM1 8h2v1h-2zM6 8h2v1h-2z"></path></svg><svg className="px nt" style={{ left: "68%" }} width="12" height="12" viewBox="0 0 9 9"><path fill="currentColor" d="M3 0h6v1h-6zM3 1h6v1h-6zM3 2h1v1h-1zM8 2h1v1h-1zM3 3h1v1h-1zM8 3h1v1h-1zM3 4h1v1h-1zM8 4h1v1h-1zM1 5h3v1h-3zM6 5h3v1h-3zM0 6h4v1h-4zM5 6h4v1h-4zM0 7h4v1h-4zM5 7h4v1h-4zM1 8h2v1h-2zM6 8h2v1h-2z"></path></svg></span>
    ),
    media: { kind: 'img', src: ensemblecrowdImg, alt: "A crowd holding up their phones during the Ensemble demo" },
    caption: "200+ phones, one orchestra",
    tilt: "-3deg", wl: 300, ws: 232, ph: 166, phs: 0,
    home: {
      name: "ensemble", date: "jul '26",
      desc: "200+ phones synced into one gesture-conducted orchestra",
      dim: "hack the 6ix finalist",
      caption: "200+ phones, one orchestra", tilt: "-3deg", width: 232,
      media: { kind: 'img', src: ensemblecrowdImg, alt: "" },
    },
  },
  {
    id: "echosign",
    name: "echosign",
    date: "feb 2026",
    sub: "emergency reports sent as sound, no internet needed",
    dim: "~99% compression",
    points: ["Gemini packs a 200-word report into 24 bytes, played as FSK audio tones", "Ed25519 signatures verify senders offline; logs sync to Solana"],
    tags: ["Gemini AI", "Solana", "React", "TypeScript"],
    motif: (
      <span className="stage m-echo"><svg className="arcs" width="12" height="18" viewBox="0 0 30 50" fill="none"><path d="M4 15c6 4 9 10 9 10s-3 6-9 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path><path d="M12 10c8 5.5 12 15 12 15s-4 9.5-12 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></path><path d="M20 6c9 7 14 19 14 19s-5 12-14 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path></svg><span className="hx2">0x</span><span className="hx2">A3</span><span className="hx2">F7</span></span>
    ),
    media: { kind: 'img', src: echosignImg, alt: "The EchoSign app on a phone" },
    caption: "data over sound!",
    tilt: "3deg", wl: 190, ws: 150, ph: 296, phs: 228,
  },
  {
    id: "flight-telemetry",
    name: "flight telemetry pipeline",
    date: "dec 2025",
    sub: "live ADS-B flight data, 50+ streams at once",
    dim: "40% faster queries",
    points: ["indexing and local caching cut query latency by 40%", "NumPy analytics turn raw positions into flight performance stats"],
    tags: ["Python", "SQL", "Flask"],
    motif: (
      <span className="stage m-plane"><span className="pl"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"></path></svg></span></span>
    ),
    media: { kind: 'img', src: flightTelemetryImg, alt: "The flight telemetry dashboard" },
    caption: "planes, live",
    tilt: "-2deg", wl: 300, ws: 232, ph: 161, phs: 0,
    home: {
      name: "flight telemetry", date: "dec '25",
      desc: "real-time ADS-B pipeline for 50+ concurrent streams",
      dim: "40% faster queries",
      caption: "planes, live", tilt: "-2deg", width: 232,
      media: { kind: 'img', src: flightTelemetryImg, alt: "" },
    },
  },
  {
    id: "intime",
    name: "intime",
    date: "nov 2025",
    sub: "a satirical productivity app built in 24 hours",
    dim: "1st place, socratica × claude",
    points: ["React + Canvas interface with physics animations at 60 fps"],
    tags: ["React", "Canvas API", "JavaScript"],
    motif: (
      <span className="stage m-clock"><span className="cd">00:03</span><span className="cd">00:02</span><span className="cd">00:01</span><span className="cd dl">$$:$$</span></span>
    ),
    media: { kind: 'img', src: intimeImg, alt: "The InTime app" },
    caption: "24 hours, 1st place",
    tilt: "4deg", wl: 290, ws: 224, ph: 200, phs: 151,
  },
  {
    id: "autonomous-nav",
    name: "autonomous navigation",
    date: "apr 2024",
    sub: "self-driving code for our FRC robot",
    dim: "95% reliable autos",
    points: ["fused vision + IMU data with custom state machines", "PID control and AprilTag tracking cut drift by 20%"],
    tags: ["Java", "OpenCV", "PID"],
    motif: (
      <span className="stage m-tag"><span className="tg"><svg className="px" width="16" height="16" viewBox="0 0 8 8"><path fill="currentColor" d="M0 0h8v1h-8zM0 1h1v1h-1zM7 1h1v1h-1zM0 2h1v1h-1zM2 2h2v1h-2zM5 2h1v1h-1zM7 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM5 3h1v1h-1zM7 3h1v1h-1zM0 4h1v1h-1zM3 4h2v1h-2zM7 4h1v1h-1zM0 5h1v1h-1zM2 5h1v1h-1zM4 5h2v1h-2zM7 5h1v1h-1zM0 6h1v1h-1zM7 6h1v1h-1zM0 7h8v1h-8z"></path></svg><i className="bk b1"></i><i className="bk b2"></i><i className="bk b3"></i><i className="bk b4"></i></span><span className="det">detected</span></span>
    ),
    media: { kind: 'img', src: autonomousNavImg, alt: "The FRC 9569 robot" },
    caption: "our robot :)",
    tilt: "-3deg", wl: 290, ws: 224, ph: 190, phs: 0,
    home: {
      name: "autonomous nav", date: "apr '24",
      desc: "sensor fusion and PID control for an FRC robot",
      dim: "95% reliable autos",
      caption: "our robot :)", tilt: "-3deg", width: 224,
      media: { kind: 'img', src: autonomousNavImg, alt: "" },
    },
  },
  {
    id: "gusty-garden",
    name: "gusty garden's produce",
    date: "dec 2023",
    sub: "a Mario Galaxy 2-themed store simulation",
    dim: "my first project",
    points: ["JavaFX app that encrypts all user data with three randomized ciphers"],
    tags: ["Java", "JavaFX", "Cryptography"],
    motif: (
      <span className="stage m-luma"><span className="lu"><svg className="ring" viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="22 85"></circle></svg><img src="/luma.png" alt="" /></span><i className="tw" style={{ left: "calc(50% - 22px)", bottom: "14px" }}></i><i className="tw" style={{ left: "calc(50% + 18px)", bottom: "20px" }}></i><i className="tw" style={{ left: "calc(50% + 24px)", bottom: "4px" }}></i></span>
    ),
    media: { kind: 'img', src: gustyGardenImg, alt: "The Gusty Garden's Produce storefront" },
    caption: "where it all started",
    tilt: "2deg", wl: 290, ws: 224, ph: 176, phs: 0,
  },
]

/** the home page's list, in this order */
export const HOME = ["ensemble", "flight-telemetry", "advolve", "autonomous-nav", "duct-flow-lab"].map((id) => PROJECTS.find((p) => p.id === id)!)
