from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor, white
from reportlab.pdfbase.pdfmetrics import stringWidth

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public'
OUT.mkdir(parents=True, exist_ok=True)
W, H = A4

FONT_REG = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
FONT_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
FONT_ITALIC = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf'
FA_FONT = '/usr/share/fonts/truetype/font-awesome/fontawesome-webfont.ttf'
pdfmetrics.registerFont(TTFont('DV', FONT_REG))
pdfmetrics.registerFont(TTFont('DVB', FONT_BOLD))
pdfmetrics.registerFont(TTFont('DVI', FONT_ITALIC))
pdfmetrics.registerFont(TTFont('FA', FA_FONT))

NAVY = HexColor('#1D2248')
PURPLE = HexColor('#4535A8')
PURPLE2 = HexColor('#5A4CC2')
TEXT = HexColor('#22263A')
MUTED = HexColor('#70758C')
LINE = HexColor('#D9DEEF')
LIGHT = HexColor('#F3F5FC')
LIGHT2 = HexColor('#F7F8FD')
LINK = HexColor('#2257A7')

ICO = {
    'profile':'\uf007','gear':'\uf013','briefcase':'\uf0b1','folder':'\uf07c',
    'grad':'\uf19d','users':'\uf0c0','map':'\uf041','mail':'\uf0e0','github':'\uf09b',
    'link':'\uf0c1','desktop':'\uf108','database':'\uf1c0','fork':'\uf126','flask':'\uf0c3',
    'window':'\uf2d0'
}

M = 22
CW = W - 2*M


def wrap_text(text, font, size, width):
    words = text.split()
    lines=[]; cur=''
    for w in words:
        cand = w if not cur else cur+' '+w
        if stringWidth(cand, font, size) <= width:
            cur=cand
        else:
            if cur: lines.append(cur)
            cur=w
    if cur: lines.append(cur)
    return lines


def draw_text(c, text, x, y, width, font='DV', size=8.2, leading=10.4, color=TEXT, max_lines=None):
    c.setFillColor(color); c.setFont(font,size)
    lines = wrap_text(text,font,size,width)
    if max_lines: lines=lines[:max_lines]
    for line in lines:
        c.drawString(x,y,line); y -= leading
    return y


def draw_bullets(c, items, x, y, width, font='DV', size=7.8, leading=9.5, gap=1.3):
    for item in items:
        lines=wrap_text(item,font,size,width-13)
        c.setFillColor(PURPLE); c.circle(x+3,y+2,1.45,fill=1,stroke=0)
        c.setFillColor(TEXT); c.setFont(font,size)
        for line in lines:
            c.drawString(x+11,y,line); y -= leading
        y -= gap
    return y


def link_text(c, label, url, x, y, font='DV', size=7.7):
    c.setFont(font,size); c.setFillColor(LINK); c.drawString(x,y,label)
    tw=stringWidth(label,font,size); c.line(x,y-1,x+tw,y-1)
    c.linkURL(url,(x,y-2,x+tw,y+size+2),relative=0,thickness=0)
    return x+tw


def section_band(c, y, title, icon):
    h=24
    c.setFillColor(LIGHT); c.roundRect(M,y-h,CW,h,5,fill=1,stroke=0)
    c.setFillColor(PURPLE); c.roundRect(M,y-h,26,h,5,fill=1,stroke=0)
    c.setFillColor(white); c.setFont('FA',11); c.drawCentredString(M+13,y-h+7,ICO[icon])
    c.setFillColor(PURPLE); c.setFont('DVB',10.2); c.drawString(M+36,y-h+7,title)
    return y-h-14


def header(c, lang):
    en = lang=='en'
    name='VIOLETTA NICOLAOU' if en else 'ВИОЛЕТТА НИКОЛАУ'
    location='Volgograd, Russia' if en else 'Волгоград, Россия'
    langs='Languages: Russian / English / Greek - fluent   •   French - beginner' if en else 'Языки: русский / English / Ελληνικά - свободно   •   Français - начальный'
    c.setFillColor(NAVY); c.setFont('DVB',22.5); c.drawString(M+5,H-38,name)
    c.setFillColor(PURPLE); c.setFont('DVB',13.1); c.drawString(M+5,H-59,'Junior Full-Stack .NET Developer')
    rx=313; y=H-31
    c.setFillColor(PURPLE); c.setFont('FA',9); c.drawString(rx,y,ICO['map'])
    c.setFillColor(TEXT); c.setFont('DV',7.8); c.drawString(rx+16,y,location)
    c.setFillColor(PURPLE); c.setFont('FA',9); c.drawString(rx+106,y,ICO['mail'])
    link_text(c,'violettanicolaou@gmail.com','mailto:violettanicolaou@gmail.com',rx+122,y,'DV',7.5)
    y-=19
    c.setFillColor(PURPLE); c.setFont('FA',9); c.drawString(rx,y,ICO['github'])
    link_text(c,'GitHub','https://github.com/ViolettaNcl',rx+16,y,'DV',7.7)
    c.setFillColor(PURPLE); c.setFont('FA',9); c.drawString(rx+106,y,ICO['link'])
    link_text(c,'Portfolio / CV','https://violetta-cv.vercel.app',rx+122,y,'DV',7.7)
    y-=19
    c.setFillColor(PURPLE); c.setFont('FA',9); c.drawString(rx,y,ICO['link'])
    c.setFillColor(TEXT); c.setFont('DVB',7.4); prefix='Languages:' if en else 'Языки:'; c.drawString(rx+16,y,prefix)
    prefixw=stringWidth(prefix,'DVB',7.4); c.setFont('DV',7.15); c.drawString(rx+20+prefixw,y,langs.split(':',1)[1].strip())
    return H-101


def tech_cards(c,y):
    colgap=11; colw=(CW-colgap)/2
    left=[
        ('desktop','Backend','C#, .NET, ASP.NET Core 9, Web API, Entity Framework Core, PHP 8.1+'),
        ('window','Frontend','JavaScript, TypeScript, React, Next.js, HTML5, CSS3, WPF, XAML, PWA'),
        ('database','Data','SQL Server, Entity Framework 6, relational data modeling, migrations'),
    ]
    right=[
        ('fork','Engineering','Git, GitHub Actions, Docker, REST, JWT, BCrypt, SignalR, CI/CD, Swagger/OpenAPI'),
        ('flask','Testing / ML','MSTest, unit & integration testing, browser/E2E testing, MLP, K-Means'),
    ]
    def card(x,top,w,icon,label,value,h,divider=83):
        c.setFillColor(LIGHT2); c.roundRect(x,top-h,w,h,4,fill=1,stroke=0)
        c.setFillColor(PURPLE); c.setFont('FA',10.5); c.drawCentredString(x+17,top-h/2-3,ICO[icon])
        c.setFillColor(PURPLE); c.setFont('DVB',7.7); c.drawString(x+36,top-16,label)
        c.setStrokeColor(LINE); c.setLineWidth(.55); c.line(x+divider,top-h+7,x+divider,top-7)
        value_x=divider+8
        c.setFillColor(TEXT); c.setFont('DV',7.35); yy=top-13
        for line in wrap_text(value,'DV',7.35,w-(divider+16)):
            c.drawString(x+value_x,yy,line); yy-=9.1
    x1=M; x2=M+colw+colgap; top=y
    for ic,lab,val in left:
        h=42; card(x1,top,colw,ic,lab,val,h); top-=h+7
    leftbottom=top; top=y
    for i,(ic,lab,val) in enumerate(right):
        h=50 if i==0 else 46; card(x2,top,colw,ic,lab,val,h,divider=101); top-=h+9
    return min(leftbottom,top)-2


def draw_pdf(lang,outfile):
    en=lang=='en'; c=canvas.Canvas(str(outfile),pagesize=A4)
    c.setTitle(('Violetta Nicolaou' if en else 'Виолетта Николау')+' - Junior Full-Stack .NET Developer'); c.setAuthor('Violetta Nicolaou')
    y=header(c,lang)
    y=section_band(c,y,'PROFESSIONAL PROFILE' if en else 'ПРОФЕССИОНАЛЬНЫЙ ПРОФИЛЬ','profile')
    profile_en=('Junior Full-Stack .NET Developer with an honours programming diploma and a strong hands-on portfolio. I build end-to-end applications with C#, ASP.NET Core, EF Core and SQL Server, including REST APIs, JWT authentication, role-based access, real-time updates with SignalR, background services, Docker, CI/CD and automated testing. My main project is a dental-clinic web platform built for a real client. Seeking a Junior C#/.NET / ASP.NET Core / Full-Stack .NET Developer role.')
    profile_ru=('Junior Full-Stack .NET разработчик с дипломом программиста с отличием и сильным практическим портфолио. Разрабатываю end-to-end приложения на C#, ASP.NET Core, EF Core и SQL Server: REST API, JWT-авторизация, ролевой доступ, realtime через SignalR, фоновые задачи, Docker, CI/CD и автоматизированное тестирование. Основной проект - веб-платформа для стоматологической клиники, созданная по требованиям реального заказчика. Ищу позицию Junior C#/.NET / ASP.NET Core / Full-Stack .NET Developer.')
    y=draw_text(c,profile_en if en else profile_ru,M+6,y,CW-12,'DV',7.8,10.7); y-=12 if en else 5
    y=section_band(c,y,'TECHNICAL STACK' if en else 'ТЕХНИЧЕСКИЙ СТЕК','gear'); y=tech_cards(c,y)
    if en: y-=10
    y=section_band(c,y,'PRACTICAL DEVELOPMENT EXPERIENCE' if en else 'ПРАКТИЧЕСКИЙ ОПЫТ РАЗРАБОТКИ','briefcase')
    c.setFillColor(NAVY); c.setFont('DVB',8.9); c.drawString(M+6,y,'Independent Full-Stack Developer - DentalClinic')
    x2=M+6+stringWidth('Independent Full-Stack Developer - DentalClinic','DVB',8.9)+9; c.setFillColor(MUTED); c.setFont('DVI',7.5); c.drawString(x2,y,'|  Client project · 2026'); y-=12
    exp_en=['Designed and built a full-stack dental-clinic web platform: public website, online booking, patient portal, CRM/admin dashboard and AI assistant.','Backend: ASP.NET Core 9, C#, REST API, layered Controllers → Services → Data architecture, EF Core 9, SQL Server, migrations and indexes.','Implemented JWT authentication, BCrypt, role-based authorization, SignalR real-time notifications, BackgroundService, rate limiting, CORS and global error handling.','Integrations: Google Gemini and ElevenLabs; 5-language interface; Docker, Swagger/OpenAPI, architecture/API/deployment documentation and automated checks.']
    exp_ru=['Спроектировала и разработала full-stack веб-платформу стоматологической клиники: публичный сайт, онлайн-запись, кабинет пациента, CRM/админ-панель и AI-консультант.','Backend: ASP.NET Core 9, C#, REST API, слоистая архитектура Controllers → Services → Data, EF Core 9, SQL Server, миграции и индексы.','Реализовала JWT-аутентификацию, BCrypt, ролевую авторизацию, SignalR realtime-уведомления, BackgroundService, rate limiting, CORS и глобальную обработку ошибок.','Интеграции: Google Gemini и ElevenLabs; интерфейс на 5 языках; Docker, Swagger/OpenAPI, документация по архитектуре/API/деплою и автоматизированные проверки.']
    y=draw_bullets(c,exp_en if en else exp_ru,M+7,y,CW-12,'DV',7.25,9.7,1.1)
    c.setFillColor(PURPLE); c.setFont('FA',8); c.drawString(M+6,y+1,ICO['link']); c.setFillColor(TEXT); c.setFont('DVB',7.3); c.drawString(M+18,y,'Demo:')
    xx=link_text(c,'dental-clinic-vn.vercel.app','https://dental-clinic-vn.vercel.app',M+48,y,'DV',7.15)
    c.setFillColor(PURPLE); c.setFont('FA',8); c.drawString(xx+17,y+1,ICO['github']); c.setFillColor(TEXT); c.setFont('DVB',7.3); c.drawString(xx+30,y,'GitHub:'); link_text(c,'ViolettaNcl/DentalClinic','https://github.com/ViolettaNcl/DentalClinic',xx+69,y,'DV',7.15)
    y-=22 if en else 15
    y=section_band(c,y,'SELECTED PROJECTS' if en else 'ИЗБРАННЫЕ ПРОЕКТЫ','folder')
    c.setFillColor(NAVY); c.setFont('DVB',8.7); c.drawString(M+6,y,'Smart Route Planner'); xx=M+6+stringWidth('Smart Route Planner','DVB',8.7)+8
    c.setFillColor(MUTED); c.setFont('DVI',7.15); c.drawString(xx,y,'|  PHP 8.1+ · JavaScript · PWA · ML · CI/CD'); y-=11
    sr_en=['PWA route planner with stop-order optimization (Nearest Neighbor + 2-opt), real-road OSRM routing, interactive map, weather and POI data.','Implemented an MLP neural network with backpropagation and K-Means from scratch; added model evaluation, cross-validation, confusion matrix and precision/recall/F1.','132 automated tests, HTTP integration and browser-flow checks, CI matrix, Docker and production smoke tests.']
    sr_ru=['PWA-планировщик маршрутов с оптимизацией порядка точек (Nearest Neighbor + 2-opt), реальной дорожной маршрутизацией OSRM, картой, погодой и POI.','Реализовала MLP-нейросеть с backpropagation и K-Means с нуля; добавила оценку модели, cross-validation, confusion matrix и precision/recall/F1.','132 автоматизированных теста, HTTP-интеграционные и browser-flow проверки, CI matrix, Docker и production smoke tests.']
    y=draw_bullets(c,sr_en if en else sr_ru,M+7,y,CW-12,'DV',7.0,9.25,.8)
    c.setFillColor(PURPLE); c.setFont('FA',7.8); c.drawString(M+6,y+1,ICO['link']); c.setFillColor(TEXT); c.setFont('DVB',7.1); c.drawString(M+18,y,'Demo:')
    xx=link_text(c,'smart-route-planner-violettancls-projects.vercel.app','https://smart-route-planner-violettancls-projects.vercel.app',M+47,y,'DV',6.9)
    c.setFillColor(PURPLE); c.setFont('FA',7.8); c.drawString(xx+13,y+1,ICO['github']); c.setFillColor(TEXT); c.setFont('DVB',7.1); c.drawString(xx+25,y,'GitHub:'); link_text(c,'ViolettaNcl/smart-route-planner','https://github.com/ViolettaNcl/smart-route-planner',xx+62,y,'DV',6.9)
    y-=19 if en else 14
    c.setFillColor(NAVY); c.setFont('DVB',8.5); c.drawString(M+6,y,'FleetManagement'); xx=M+6+stringWidth('FleetManagement','DVB',8.5)+8
    c.setFillColor(MUTED); c.setFont('DVI',7.0); c.drawString(xx,y,'|  C# · WPF/XAML · .NET Framework · EF6 · SQL Server · MSTest'); y-=11
    fl_en=['Role-based desktop application for managing vehicles, drivers and routes with a structured data layer, SQL Server and automated tests.','Produced the technical specification, architecture, class/sequence/state diagrams, developer documentation and database script.']
    fl_ru=['Ролевое desktop-приложение для управления автопарком, водителями и маршрутами со структурированным слоем данных, SQL Server и тестами.','Подготовлены техническое задание, архитектура, диаграммы классов/последовательностей/состояний, документация разработчика и скрипт БД.']
    y=draw_bullets(c,fl_en if en else fl_ru,M+7,y,CW-12,'DV',6.95,9.0,.7)
    c.setFillColor(PURPLE); c.setFont('FA',7.8); c.drawString(M+6,y+1,ICO['github']); c.setFillColor(TEXT); c.setFont('DVB',7.1); c.drawString(M+18,y,'GitHub:'); link_text(c,'ViolettaNcl/FleetManagement','https://github.com/ViolettaNcl/FleetManagement',M+56,y,'DV',6.95)
    y-=19 if en else 14
    c.setFillColor(NAVY); c.setFont('DVB',8.4); c.drawString(M+6,y,'Developer CV Website'); xx=M+6+stringWidth('Developer CV Website','DVB',8.4)+8
    c.setFillColor(MUTED); c.setFont('DVI',7.0); c.drawString(xx,y,'|  Next.js 16 · React 19 · TypeScript'); y-=11
    cv_en='Multilingual responsive CV/portfolio website (EN/RU/EL) with accessible semantics, adaptive navigation and downloadable PDF CV.'
    cv_ru='Многоязычный responsive CV/portfolio сайт (EN/RU/EL) с доступной семантикой, адаптивной навигацией и загрузкой ATS CV в PDF/DOCX.'
    y=draw_bullets(c,[cv_en if en else cv_ru],M+7,y,CW-12,'DV',6.95,9.0,.5); y-=11 if en else 3
    gap=10; boxw=(CW-gap)/2; top=y
    for x,title,icon in [(M,'EDUCATION' if en else 'ОБРАЗОВАНИЕ','grad'),(M+boxw+gap,'ADDITIONAL EXPERIENCE' if en else 'ДОПОЛНИТЕЛЬНЫЙ ОПЫТ','users')]:
        c.setFillColor(LIGHT); c.roundRect(x,top-24,boxw,24,5,fill=1,stroke=0); c.setFillColor(PURPLE); c.roundRect(x,top-24,26,24,5,fill=1,stroke=0)
        c.setFillColor(white); c.setFont('FA',10.5); c.drawCentredString(x+13,top-17,ICO[icon]); c.setFillColor(PURPLE); c.setFont('DVB',9.2); c.drawString(x+36,top-17,title)
    yy=top-36; c.setFillColor(NAVY); c.setFont('DVB',7.5)
    school='Moscow International College of Digital Technologies “TOP Academy”' if en else 'Московский международный колледж цифровых технологий «Академия ТОП»'
    for line in wrap_text(school,'DVB',7.5,boxw-12): c.drawString(M+6,yy,line); yy-=8.7
    c.setFillColor(MUTED); c.setFont('DVI',6.9); c.drawString(M+6,yy,('Moscow · graduated July 2026' if en else 'Москва · выпуск июль 2026')); yy-=10
    edu=('09.02.07 Information Systems and Programming - Programmer qualification, diploma with honours (red diploma).' if en else '09.02.07 Информационные системы и программирование - квалификация «Программист», диплом с отличием (красный диплом).')
    draw_text(c,edu,M+6,yy,boxw-12,'DV',6.7,8.1)
    x=M+boxw+gap; yy=top-36; c.setFillColor(NAVY); c.setFont('DVB',7.25)
    exp1='Independent Translator (2019 - Present)' if en else 'Независимый переводчик (2019 - настоящее время)'; c.drawString(x+6,yy,exp1); yy-=9.2
    c.drawString(x+6,yy,'Front Desk Receptionist, Crowne Plaza Limassol (2020 - 2022)'); yy-=10
    ad=('Multilingual professional communication, client service, reservations and cross-department coordination.' if en else 'Многоязычная профессиональная коммуникация, работа с клиентами, бронированиями и координация между отделами.')
    draw_text(c,ad,x+6,yy,boxw-12,'DV',6.7,8.1)
    fy=18; c.setStrokeColor(PURPLE2); c.setLineWidth(.65); c.line(M,fy+5,155,fy+5); c.line(W-155,fy+5,W-M,fy+5)
    footer=('Violetta Nicolaou' if en else 'Виолетта Николау')+' · Junior Full-Stack .NET Developer · github.com/ViolettaNcl'
    c.setFillColor(MUTED); c.setFont('DV',6.2); c.drawCentredString(W/2,fy,footer)
    c.linkURL('https://github.com/ViolettaNcl',(W/2+40,fy-2,W/2+165,fy+8),relative=0,thickness=0)
    c.showPage(); c.save()

if __name__=='__main__':
    draw_pdf('en',OUT/'Violetta_Nicolaou_CV_EN.pdf')
    draw_pdf('ru',OUT/'Violetta_Nicolaou_CV_RU.pdf')
