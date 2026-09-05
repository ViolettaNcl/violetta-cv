from __future__ import annotations

import shutil
import subprocess
import tempfile
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
BUILD = ROOT / "build" / "cv"
EN_PDF = PUBLIC / "Violetta_Nicolaou_CV_EN.pdf"
RU_PDF = PUBLIC / "Violetta_Nicolaou_CV_RU.pdf"

TECH = [
    ("Backend", "C#, .NET, ASP.NET Core 9, Web API, Entity Framework Core, PHP 8.1+"),
    ("Frontend", "JavaScript, TypeScript, React, Next.js, HTML5, CSS3, WPF, XAML, PWA"),
    ("Data", "SQL Server, Entity Framework 6, relational data modeling, migrations"),
    ("Engineering", "Git, GitHub Actions, Docker, REST, JWT, BCrypt, SignalR, CI/CD, Swagger/OpenAPI"),
    ("Testing / ML", "MSTest, unit & integration testing, browser/E2E testing, MLP, K-Means"),
]

RU = {
    "name": "ВИОЛЕТТА НИКОЛАУ",
    "role": "Junior Full-Stack .NET Developer  |  C# / ASP.NET Core / SQL / JavaScript",
    "location": "Волгоград, Россия",
    "languages": "Языки: русский / English / Ελληνικά — свободно   •   Français — начальный",
    "profile_heading": "ПРОФЕССИОНАЛЬНЫЙ ПРОФИЛЬ",
    "profile": "Junior Full-Stack .NET разработчик с дипломом программиста с отличием и сильным практическим портфолио. Разрабатываю end-to-end приложения на C#, ASP.NET Core, EF Core и SQL Server: REST API, JWT-авторизация, ролевой доступ, realtime через SignalR, фоновые задачи, Docker, CI/CD и автоматизированное тестирование. Основной проект — веб-платформа для стоматологической клиники, созданная по требованиям реального заказчика. Ищу позицию Junior C#/.NET / ASP.NET Core / Full-Stack .NET Developer.",
    "stack_heading": "ТЕХНИЧЕСКИЙ СТЕК",
    "experience_heading": "ПРАКТИЧЕСКИЙ ОПЫТ РАЗРАБОТКИ",
    "dental_bullets": [
        "Спроектировала и разработала full-stack веб-платформу стоматологической клиники: публичный сайт, онлайн-запись, кабинет пациента, CRM/админ-панель и AI-консультант.",
        "Backend: ASP.NET Core 9, C#, REST API, слоистая архитектура Controllers → Services → Data, EF Core 9, SQL Server, миграции и индексы.",
        "Реализовала JWT-аутентификацию, BCrypt, ролевую авторизацию, SignalR realtime-уведомления, BackgroundService, rate limiting, CORS и глобальную обработку ошибок.",
        "Интеграции: Google Gemini и ElevenLabs; интерфейс на 5 языках; Docker, Swagger/OpenAPI, документация по архитектуре/API/деплою и автоматизированные проверки.",
    ],
    "demo": "Демо",
    "projects_heading": "ИЗБРАННЫЕ ПРОЕКТЫ",
    "route_bullets": [
        "PWA-планировщик маршрутов с оптимизацией порядка точек (Nearest Neighbor + 2-opt), реальной дорожной маршрутизацией OSRM, картой, погодой и POI.",
        "Реализовала MLP-нейросеть с backpropagation и K-Means с нуля; добавила оценку модели, cross-validation, confusion matrix и precision/recall/F1.",
        "132 автоматизированных теста, HTTP-интеграционные и browser-flow проверки, CI matrix, Docker и production smoke tests.",
    ],
    "fleet_bullets": [
        "Ролевое desktop-приложение для управления автопарком, водителями и маршрутами со структурированным слоем данных, SQL Server и тестами.",
        "Подготовлены техническое задание, архитектура, диаграммы классов/последовательностей/состояний, документация разработчика и скрипт БД.",
    ],
    "cv_bullet": "Многоязычный responsive CV/portfolio сайт (EN/RU/EL) с доступной семантикой, адаптивной навигацией и загрузкой CV в PDF.",
    "education_heading": "ОБРАЗОВАНИЕ",
    "school": "Московский международный колледж цифровых технологий «Академия ТОП»",
    "school_meta": "Москва · выпуск июль 2026",
    "education": "09.02.07 Информационные системы и программирование — квалификация «Программист», диплом с отличием (красный диплом).",
    "additional_heading": "ДОПОЛНИТЕЛЬНЫЙ ОПЫТ",
    "additional_roles": "Независимый переводчик (2019 — настоящее время)  •  Front Desk Receptionist, Crowne Plaza Limassol (2020 — 2022)",
    "additional": "Многоязычная профессиональная коммуникация, работа с клиентами, бронированиями и координация между отделами.",
    "footer": "Виолетта Николау · Junior Full-Stack .NET Developer · github.com/ViolettaNcl",
}

EN = {
    "name": "VIOLETTA NICOLAOU",
    "role": "Junior Full-Stack .NET Developer  |  C# / ASP.NET Core / SQL / JavaScript",
    "location": "Volgograd, Russia",
    "languages": "Languages: Russian / English / Greek — fluent   •   French — beginner",
    "profile_heading": "PROFESSIONAL PROFILE",
    "profile": "Junior Full-Stack .NET Developer with an honours programming diploma and a strong hands-on portfolio. I build end-to-end applications with C#, ASP.NET Core, EF Core and SQL Server: REST APIs, JWT authentication, role-based access, real-time updates with SignalR, background services, Docker, CI/CD and automated testing. My main project is a dental-clinic web platform built for a real client. Seeking a Junior C#/.NET / ASP.NET Core / Full-Stack .NET Developer role.",
    "stack_heading": "TECHNICAL STACK",
    "experience_heading": "PRACTICAL DEVELOPMENT EXPERIENCE",
    "dental_bullets": [
        "Designed and built a full-stack dental-clinic web platform: public website, online booking, patient portal, CRM/admin dashboard and AI assistant.",
        "Backend: ASP.NET Core 9, C#, REST API, layered Controllers → Services → Data architecture, EF Core 9, SQL Server, migrations and indexes.",
        "Implemented JWT authentication, BCrypt, role-based authorization, SignalR real-time notifications, BackgroundService, rate limiting, CORS and global error handling.",
        "Integrations: Google Gemini and ElevenLabs; 5-language interface; Docker, Swagger/OpenAPI, architecture/API/deployment documentation and automated checks.",
    ],
    "demo": "Demo",
    "projects_heading": "SELECTED PROJECTS",
    "route_bullets": [
        "PWA route planner with stop-order optimization (Nearest Neighbor + 2-opt), real-road OSRM routing, interactive map, weather and POI data.",
        "Implemented an MLP neural network with backpropagation and K-Means from scratch; added model evaluation, cross-validation, confusion matrix and precision/recall/F1.",
        "132 automated tests, HTTP integration and browser-flow checks, CI matrix, Docker and production smoke tests.",
    ],
    "fleet_bullets": [
        "Role-based desktop application for managing vehicles, drivers and routes with a structured data layer, SQL Server and automated tests.",
        "Produced the technical specification, architecture, class/sequence/state diagrams, developer documentation and database script.",
    ],
    "cv_bullet": "Multilingual responsive CV/portfolio website (EN/RU/EL) with accessible semantics, adaptive navigation and downloadable PDF CV.",
    "education_heading": "EDUCATION",
    "school": "Moscow International College of Digital Technologies “TOP Academy”",
    "school_meta": "Moscow · graduated July 2026",
    "education": "09.02.07 Information Systems and Programming — Programmer qualification, diploma with honours (red diploma).",
    "additional_heading": "ADDITIONAL EXPERIENCE",
    "additional_roles": "Independent Translator (2019 — Present)  •  Front Desk Receptionist, Crowne Plaza Limassol (2020 — 2022)",
    "additional": "Multilingual professional communication, client service, reservations and cross-department coordination.",
    "footer": "Violetta Nicolaou · Junior Full-Stack .NET Developer · github.com/ViolettaNcl",
}


def e(value: str) -> str:
    return escape(value, quote=True)


def bullet_list(items: list[str]) -> str:
    return "<ul>" + "".join(f"<li>{e(item)}</li>" for item in items) + "</ul>"


def html_for(data: dict[str, object]) -> str:
    tech_rows = "".join(
        f"<tr><td>{e(label)}</td><td>{e(value)}</td></tr>" for label, value in TECH
    )
    return f"""<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>{e(str(data['name']))} — CV</title>
<style>
@page {{ size: Letter; margin: 0; }}
* {{ box-sizing: border-box; }}
html, body {{ margin: 0; padding: 0; background: white; }}
body {{ font-family: Carlito, Calibri, Arial, sans-serif; color: #24242a; }}
.page {{ width: 8.5in; height: 11in; padding: .38in .58in .34in; position: relative; overflow: hidden; background: white; }}
h1 {{ margin: 0 0 1px; text-align: center; font-size: 20pt; line-height: 1; letter-spacing: .15px; color: #282830; }}
.role {{ text-align: center; font-size: 10.9pt; line-height: 1.05; font-weight: 700; color: #563f7c; margin-bottom: 2px; }}
.contact, .languages {{ text-align: center; font-size: 9.25pt; line-height: 1.1; color: #4b4b52; }}
.contact {{ margin-bottom: 3px; }}
.languages {{ color: #5c5c64; }}
a {{ color: inherit; text-decoration: none; }}
.section {{ font-size: 10.7pt; line-height: 1; font-weight: 700; color: #37373c; margin: 5.5pt 0 2.2pt; }}
p {{ margin: 0; font-size: 9.3pt; line-height: 1.04; }}
.profile {{ margin-bottom: 1px; }}
table {{ width: 100%; border-collapse: collapse; table-layout: fixed; margin-bottom: 1px; }}
td {{ font-size: 8.95pt; line-height: 1.0; padding: 1.1px 0; border-bottom: .35px solid #e6e6ec; vertical-align: top; }}
td:first-child {{ width: 15.8%; font-weight: 700; color: #483769; padding-right: 7px; }}
.job {{ margin: 2px 0 1px; font-size: 9.45pt; line-height: 1.02; }}
.job b {{ font-size: 9.7pt; color: #23232a; }}
.meta {{ font-size: 8.75pt; font-style: italic; color: #5a5a62; }}
ul {{ margin: 0 0 1px 13px; padding: 0; }}
li {{ font-size: 8.72pt; line-height: 1.02; margin: 0 0 1pt; padding-left: 1px; }}
.links {{ font-size: 8.65pt; line-height: 1.02; margin: 0 0 1px; color: #4c4c55; }}
.links a {{ color: #483769; font-weight: 700; }}
.school {{ font-size: 9.35pt; line-height: 1.02; margin: 1px 0; }}
.school b {{ font-size: 9.5pt; }}
.small {{ font-size: 8.85pt; line-height: 1.02; }}
.footer {{ position: absolute; bottom: .12in; left: .58in; right: .58in; text-align: center; color: #6a6a72; font-size: 7.65pt; }}
</style>
</head>
<body>
<div class="page">
<h1>{e(str(data['name']))}</h1>
<div class="role">{e(str(data['role']))}</div>
<div class="contact">{e(str(data['location']))} &nbsp;•&nbsp; <a href="mailto:violettanicolaou@gmail.com">violettanicolaou@gmail.com</a> &nbsp;•&nbsp; <a href="https://github.com/ViolettaNcl">GitHub</a> &nbsp;•&nbsp; <a href="https://violetta-cv.vercel.app">Portfolio / CV</a></div>
<div class="languages">{e(str(data['languages']))}</div>
<div class="section">{e(str(data['profile_heading']))}</div>
<p class="profile">{e(str(data['profile']))}</p>
<div class="section">{e(str(data['stack_heading']))}</div>
<table>{tech_rows}</table>
<div class="section">{e(str(data['experience_heading']))}</div>
<div class="job"><b>Independent Full-Stack Developer — DentalClinic</b> <span class="meta">| Client project · 2026</span></div>
{bullet_list(data['dental_bullets'])}
<div class="links">{e(str(data['demo']))}: <a href="https://dental-clinic-vn.vercel.app">dental-clinic-vn.vercel.app</a> &nbsp; GitHub: <a href="https://github.com/ViolettaNcl/DentalClinic">ViolettaNcl/DentalClinic</a></div>
<div class="section">{e(str(data['projects_heading']))}</div>
<div class="job"><b>Smart Route Planner</b> <span class="meta">| PHP 8.1+ · JavaScript · PWA · ML · CI/CD</span></div>
{bullet_list(data['route_bullets'])}
<div class="links">{e(str(data['demo']))}: <a href="https://smart-route-planner-violettancls-projects.vercel.app">smart-route-planner-violettancls-projects.vercel.app</a> &nbsp; GitHub: <a href="https://github.com/ViolettaNcl/smart-route-planner">ViolettaNcl/smart-route-planner</a></div>
<div class="job"><b>FleetManagement</b> <span class="meta">| C# · WPF/XAML · .NET Framework · EF6 · SQL Server · MSTest</span></div>
{bullet_list(data['fleet_bullets'])}
<div class="links">GitHub: <a href="https://github.com/ViolettaNcl/FleetManagement">ViolettaNcl/FleetManagement</a></div>
<div class="job"><b>Developer CV Website</b> <span class="meta">| Next.js 16 · React 19 · TypeScript</span></div>
{bullet_list([str(data['cv_bullet'])])}
<div class="section">{e(str(data['education_heading']))}</div>
<div class="school"><b>{e(str(data['school']))}</b> <span class="meta">| {e(str(data['school_meta']))}</span></div>
<p class="small">{e(str(data['education']))}</p>
<div class="section">{e(str(data['additional_heading']))}</div>
<p class="small"><b>{e(str(data['additional_roles']))}</b></p>
<p class="small">{e(str(data['additional']))}</p>
<div class="footer">{e(str(data['footer']))}</div>
</div>
</body>
</html>"""


def browser() -> str:
    candidate = shutil.which("google-chrome") or shutil.which("chromium") or shutil.which("chromium-browser")
    if not candidate:
        raise RuntimeError("Chrome/Chromium is required to render the CV PDFs")
    return candidate


def render_pdf(data: dict[str, object], output: Path, stem: str) -> None:
    html_path = BUILD / f"{stem}.html"
    html_path.write_text(html_for(data), encoding="utf-8")
    if output.exists():
        output.unlink()

    with tempfile.TemporaryDirectory(prefix="cv-chrome-") as profile_dir:
        subprocess.run(
            [
                browser(),
                "--headless",
                "--no-sandbox",
                "--disable-gpu",
                "--disable-dev-shm-usage",
                f"--user-data-dir={profile_dir}",
                "--no-pdf-header-footer",
                f"--print-to-pdf={output}",
                html_path.resolve().as_uri(),
            ],
            check=True,
            timeout=90,
        )

    if not output.exists() or output.stat().st_size < 10_000:
        raise RuntimeError(f"PDF generation failed: {output}")
    print(f"Generated {output.relative_to(ROOT)} ({output.stat().st_size} bytes)")


def main() -> None:
    BUILD.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    render_pdf(RU, RU_PDF, "cv_ru")
    render_pdf(EN, EN_PDF, "cv_en")


if __name__ == "__main__":
    main()
