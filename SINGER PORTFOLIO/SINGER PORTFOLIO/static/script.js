// ============================================================
// SINGER PORTFOLIO - COMPLETE SCRIPT
// ============================================================

// ---------- TOP BUTTON ----------
function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function () {
    const btn = document.getElementById('topBtn');
    if (btn) btn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// ---------- MENU TOGGLE ----------
function showMenu() {
    var menu = document.getElementById('menuList');
    if (!menu) return;
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

// Close menu when clicking outside
document.addEventListener('click', function (e) {
    var menu = document.getElementById('menuList');
    var menuBtn = document.querySelector('.menu');
    if (menu && menuBtn && !menu.contains(e.target) && e.target !== menuBtn) {
        menu.style.display = 'none';
    }
});

// Close menu when a link inside it is clicked
document.addEventListener('DOMContentLoaded', function () {
    var menuLinks = document.querySelectorAll('.menu-list a');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            var menu = document.getElementById('menuList');
            if (menu) menu.style.display = 'none';
        });
    });
});

// ---------- EXPLORE MORE ----------
function showMore() {
    window.location.href = 'explore';
}

// ---------- SKIP INTRO ----------
function skipIntro() {
    var intro = document.getElementById('introAnimation');
    var btn = document.getElementById('skipIntroBtn');
    if (intro) {
        intro.style.transition = 'opacity 0.5s ease';
        intro.style.opacity = '0';
        setTimeout(function () {
            intro.style.visibility = 'hidden';
            intro.style.pointerEvents = 'none';
        }, 500);
    }
    if (btn) {
        btn.style.display = 'none';
    }
}

// Auto-hide skip button when intro ends
document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('skipIntroBtn');
    if (btn) {
        setTimeout(function () {
            btn.style.transition = 'opacity 0.5s ease';
            btn.style.opacity = '0';
            setTimeout(function () { btn.style.display = 'none'; }, 500);
        }, 5000);
    }
});

// ---------- EVENT BOOKING FORM (popup for event cards) ----------
function bookEvent(eventName) {
    document.getElementById('eventForm').style.display = 'flex';
    document.getElementById('eventName').value = eventName;
}

function closeForm() {
    document.getElementById('eventForm').style.display = 'none';
}

function confirmBooking(e) {
    e.preventDefault();
    var name = document.getElementById('userName').value.trim();
    var email = document.getElementById('userEmail').value.trim();
    var event = document.getElementById('eventName').value;
    var seats = document.getElementById('seats').value;

    if (!name || !email || !seats) {
        alert('Please fill in all required fields.');
        return;
    }

    var subject = encodeURIComponent('Event Ticket Request \u2013 ' + event);
    var body = encodeURIComponent(
        'Event Ticket Request\n' +
        '========================\n' +
        'Event: ' + event + '\n' +
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Seats: ' + seats + '\n\n' +
        'Please confirm my booking.\n\nThank you!'
    );

    window.location.href = 'mailto:sujataguravkammar@gmail.com?subject=' + subject + '&body=' + body;

    setTimeout(function () {
        document.getElementById('eventForm').style.display = 'none';
        e.target.reset();
    }, 500);
}

window.addEventListener('click', function (e) {
    var popup = document.getElementById('eventForm');
    if (popup && e.target === popup) closeForm();
});

// ---------- BOOKING CALENDAR ----------
var calState = {
    selectedDate: null,
    selectedTime: null,
    year: new Date().getFullYear(),
    month: new Date().getMonth()
};

var timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];

function renderCalendar() {
    var calGridEl = document.getElementById('calGrid');
    var calMonthEl = document.getElementById('calMonthLabel');
    if (!calGridEl || !calMonthEl) return;

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    calMonthEl.textContent = months[calState.month] + ' ' + calState.year;

    var days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    var html = '';
    days.forEach(function (d) {
        html += '<div class="cal-day-header">' + d + '</div>';
    });

    var firstDay = new Date(calState.year, calState.month, 1).getDay();
    var totalDays = new Date(calState.year, calState.month + 1, 0).getDate();
    var today = new Date();
    today.setHours(0,0,0,0);

    for (var i = 0; i < firstDay; i++) {
        html += '<div class="cal-day cal-empty"></div>';
    }

    for (var d = 1; d <= totalDays; d++) {
        var thisDate = new Date(calState.year, calState.month, d);
        var isPast = thisDate < today;
        var isToday = thisDate.getTime() === today.getTime();
        var dateStr = calState.year + '-' + String(calState.month + 1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
        var isSelected = calState.selectedDate === dateStr;

        var classes = 'cal-day';
        if (isPast) classes += ' cal-disabled';
        else if (isSelected) classes += ' cal-selected';
        else if (isToday) classes += ' cal-today';

        var onclick = isPast ? '' : ' onclick="selectCalDate(\'' + dateStr + '\')"';
        html += '<div class="' + classes + '"' + onclick + '>' + d + '</div>';
    }

    calGridEl.innerHTML = html;
    renderTimeSlots();
    updateCalInfo();
}

function selectCalDate(dateStr) {
    calState.selectedDate = dateStr;
    calState.selectedTime = null;
    renderCalendar();
    // Populate the date input in the booking form
    var dateInput = document.getElementById('bkEventDate');
    if (dateInput) dateInput.value = dateStr;
}

function renderTimeSlots() {
    var el = document.getElementById('calTimeSlots');
    if (!el) return;
    if (!calState.selectedDate) {
        el.style.display = 'none';
        return;
    }
    el.style.display = 'block';
    var html = timeSlots.map(function (t) {
        var sel = calState.selectedTime === t ? ' selected' : '';
        return '<div class="time-slot' + sel + '" onclick="selectCalTime(\'' + t + '\')">' + t + '</div>';
    }).join('');
    document.getElementById('timeSlotsGrid').innerHTML = html;
}

function selectCalTime(time) {
    calState.selectedTime = time;
    renderTimeSlots();
    updateCalInfo();
    // Populate a hidden time field or combine with date
    var timeInput = document.getElementById('bkEventTime');
    if (timeInput) timeInput.value = time;
    // Also update the date field to show date + time
    var dateInput = document.getElementById('bkEventDate');
    if (dateInput && calState.selectedDate) {
        dateInput.value = calState.selectedDate;
    }
}

function updateCalInfo() {
    var el = document.getElementById('calSelectedInfo');
    if (!el) return;
    if (calState.selectedDate && calState.selectedTime) {
        var d = new Date(calState.selectedDate + 'T00:00:00');
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        el.textContent = '\u2713 ' + d.toLocaleDateString('en-IN', options) + ' at ' + calState.selectedTime;
    } else if (calState.selectedDate) {
        var d2 = new Date(calState.selectedDate + 'T00:00:00');
        var opts2 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        el.textContent = d2.toLocaleDateString('en-IN', opts2) + ' \u2014 select a time slot';
    } else {
        el.textContent = '';
    }
}

function calPrev() {
    if (calState.month === 0) { calState.month = 11; calState.year--; }
    else calState.month--;
    renderCalendar();
}

function calNext() {
    if (calState.month === 11) { calState.month = 0; calState.year++; }
    else calState.month++;
    renderCalendar();
}

// ---------- BOOKING FORM - OUTLOOK/MAILTO ----------
var bookingSubmitted = false;

function validateBookingForm() {
    var valid = true;

    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(function (el) { el.style.display = 'none'; });
    document.querySelectorAll('input.invalid, select.invalid, textarea.invalid').forEach(function (el) { el.classList.remove('invalid'); });

    // Name
    var nameEl = document.getElementById('bkName');
    if (nameEl && !nameEl.value.trim()) {
        markInvalid(nameEl, 'Please enter your name.');
        valid = false;
    }
    // Email
    var emailEl = document.getElementById('bkEmail');
    if (emailEl) {
        if (!emailEl.value.trim()) { markInvalid(emailEl, 'Please enter your email.'); valid = false; }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) { markInvalid(emailEl, 'Please enter a valid email address.'); valid = false; }
    }
    // Phone
    var phoneEl = document.getElementById('bkPhone');
    if (phoneEl && !phoneEl.value.trim()) { markInvalid(phoneEl, 'Please enter your phone number.'); valid = false; }
    // Date
    var dateEl = document.getElementById('bkEventDate');
    if (dateEl && !dateEl.value) { markInvalid(dateEl, 'Please select an event date.'); valid = false; }
    else if (dateEl && dateEl.value) {
        var selectedDate = new Date(dateEl.value);
        var today = new Date(); today.setHours(0,0,0,0);
        if (selectedDate < today) { markInvalid(dateEl, 'Event date cannot be in the past.'); valid = false; }
    }
    // City
    var cityEl = document.getElementById('bkCity');
    if (cityEl && !cityEl.value.trim()) { markInvalid(cityEl, 'Please enter the event city.'); valid = false; }

    return valid;
}

function markInvalid(el, message) {
    el.classList.add('invalid');
    var errEl = el.parentElement.querySelector('.form-error');
    if (errEl) { errEl.textContent = message; errEl.style.display = 'block'; }
}

function submitBookingForm(e) {
    e.preventDefault();
    if (bookingSubmitted) {
        alert('Your booking request has already been submitted. Please check your email client.');
        return;
    }
    if (!validateBookingForm()) return;

    var btn = e.target.querySelector('button[type="submit"]');
    if (btn) btn.classList.add('btn-loading');

    var name = document.getElementById('bkName').value.trim();
    var email = document.getElementById('bkEmail').value.trim();
    var phone = document.getElementById('bkPhone').value.trim();
    var eventType = document.getElementById('bkEventType') ? document.getElementById('bkEventType').value : 'Live Concert';
    var eventDate = document.getElementById('bkEventDate').value;
    var eventTime = document.getElementById('bkEventTime') ? document.getElementById('bkEventTime').value : '';
    var city = document.getElementById('bkCity').value.trim();
    var audience = document.getElementById('bkAudience') ? document.getElementById('bkAudience').value : '';
    var details = document.getElementById('bkDetails') ? document.getElementById('bkDetails').value.trim() : '';

    var formattedDate = eventDate;
    if (eventDate) {
        var d = new Date(eventDate + 'T00:00:00');
        formattedDate = d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    var subject = encodeURIComponent('Artist Booking Request \u2013 ' + eventType + ' | ' + formattedDate);
    var body = encodeURIComponent(
        '========================================\n' +
        '       ARTIST BOOKING REQUEST\n' +
        '       Vidushi Sujata Gurav Kammar\n' +
        '========================================\n\n' +
        'CLIENT INFORMATION\n' +
        '--------------------\n' +
        'Name        : ' + name + '\n' +
        'Email       : ' + email + '\n' +
        'Phone       : ' + phone + '\n\n' +
        'EVENT DETAILS\n' +
        '--------------------\n' +
        'Event Type  : ' + eventType + '\n' +
        'Event Date  : ' + formattedDate + '\n' +
        (eventTime ? 'Event Time  : ' + eventTime + '\n' : '') +
        'Venue/City  : ' + city + '\n' +
        (audience ? 'Audience    : ' + audience + ' people\n' : '') +
        '\nSPECIAL REQUIREMENTS\n' +
        '--------------------\n' +
        (details || 'None specified') + '\n\n' +
        '========================================\n' +
        'Sent from: Sujata Gurav Portfolio\n' +
        'Website: sujata-vocalist.vercel.app\n' +
        '========================================'
    );

    setTimeout(function () {
        window.location.href = 'mailto:sujataguravkammar@gmail.com?subject=' + subject + '&body=' + body;

        if (btn) btn.classList.remove('btn-loading');
        bookingSubmitted = true;

        var successEl = document.getElementById('bookingSuccess');
        if (successEl) {
            successEl.style.display = 'block';
            successEl.textContent = '\u2713 Your email client has opened with the booking details. Please review and send it to complete your request.';
        }

        // Generate PDF after a short delay
        setTimeout(function () { generateBookingPDF({ name: name, email: email, phone: phone, eventType: eventType, eventDate: formattedDate, eventTime: eventTime, city: city, audience: audience, details: details }); }, 1500);

        // Reset submission lock after 10 seconds
        setTimeout(function () { bookingSubmitted = false; }, 10000);
    }, 800);
}

// ---------- MESSAGE FORM - MAILTO ----------
var messageSubmitted = false;

function submitMessageForm(e) {
    e.preventDefault();
    if (messageSubmitted) {
        alert('Your message has already been submitted.');
        return;
    }

    var nameEl = document.getElementById('msgName');
    var emailEl = document.getElementById('msgEmail');
    var msgEl = document.getElementById('msgText');

    var valid = true;
    document.querySelectorAll('#messageForm .form-error').forEach(function (el) { el.style.display = 'none'; });
    [nameEl, emailEl, msgEl].forEach(function (el) { if(el) el.classList.remove('invalid'); });

    if (!nameEl || !nameEl.value.trim()) { if(nameEl) markInvalid(nameEl, 'Please enter your name.'); valid = false; }
    if (!emailEl || !emailEl.value.trim()) { if(emailEl) markInvalid(emailEl, 'Please enter your email.'); valid = false; }
    else if (emailEl && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) { markInvalid(emailEl, 'Please enter a valid email.'); valid = false; }
    if (!msgEl || !msgEl.value.trim()) { if(msgEl) markInvalid(msgEl, 'Please write your message.'); valid = false; }
    if (!valid) return;

    var btn = e.target.querySelector('button[type="submit"]');
    if (btn) btn.classList.add('btn-loading');

    var name = nameEl.value.trim();
    var email = emailEl.value.trim();
    var msg = msgEl.value.trim();

    var subject = encodeURIComponent('Message from ' + name + ' | Sujata Vocalist Portfolio');
    var body = encodeURIComponent(
        'MESSAGE FROM FAN / VISITOR\n' +
        '============================\n\n' +
        'From     : ' + name + '\n' +
        'Email    : ' + email + '\n\n' +
        'Message:\n' +
        '----------\n' +
        msg + '\n\n' +
        '============================\n' +
        'Sent from: Sujata Gurav Portfolio Website'
    );

    setTimeout(function () {
        window.location.href = 'mailto:sujataguravkammar@gmail.com?subject=' + subject + '&body=' + body;
        if (btn) btn.classList.remove('btn-loading');
        messageSubmitted = true;

        var successEl = document.getElementById('messageSuccess');
        if (successEl) {
            successEl.style.display = 'block';
            successEl.textContent = '\u2713 Your email client has opened. Please send it to deliver your message!';
        }
        setTimeout(function () { messageSubmitted = false; }, 10000);
    }, 600);
}

// ---------- PDF GENERATION ----------
function generateBookingPDF(data) {
    // We'll use jsPDF loaded from CDN
    if (typeof window.jspdf === 'undefined' && typeof window.jsPDF === 'undefined') {
        console.warn('jsPDF not loaded, skipping PDF generation');
        return;
    }
    var jsPDF = window.jspdf ? window.jspdf.jsPDF : window.jsPDF;

    var doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    var W = doc.internal.pageSize.getWidth();
    var H = doc.internal.pageSize.getHeight();

    // Background
    doc.setFillColor(13, 4, 20);
    doc.rect(0, 0, W, H, 'F');

    // Gold header bar
    doc.setFillColor(255, 216, 107);
    doc.rect(0, 0, W, 2, 'F');

    // Purple accent bar
    doc.setFillColor(93, 38, 117);
    doc.rect(0, 2, W, 30, 'F');

    // Header text
    doc.setTextColor(255, 216, 107);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('ARTIST BOOKING CONFIRMATION', W / 2, 20, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(220, 200, 230);
    doc.text('Vidushi Sujata Gurav Kammar | Hindustani Classical Vocalist', W / 2, 28, { align: 'center' });

    // Gold divider
    doc.setDrawColor(255, 216, 107);
    doc.setLineWidth(0.5);
    doc.line(15, 36, W - 15, 36);

    // Date generated
    doc.setFontSize(9);
    doc.setTextColor(160, 150, 170);
    doc.text('Generated: ' + new Date().toLocaleString('en-IN'), W - 15, 42, { align: 'right' });

    // Section: Client Info
    var y = 52;
    function sectionHeader(title, yPos) {
        doc.setFillColor(50, 16, 71);
        doc.roundedRect(15, yPos, W - 30, 9, 2, 2, 'F');
        doc.setTextColor(255, 216, 107);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(title, 20, yPos + 6.5);
        return yPos + 14;
    }

    function fieldRow(label, value, yPos) {
        doc.setTextColor(180, 165, 195);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(label + ':', 20, yPos);
        doc.setTextColor(235, 225, 245);
        doc.setFont('helvetica', 'normal');
        doc.text(value || '\u2014', 65, yPos);
        return yPos + 8;
    }

    y = sectionHeader('CLIENT INFORMATION', y);
    y = fieldRow('Name', data.name, y);
    y = fieldRow('Email', data.email, y);
    y = fieldRow('Phone', data.phone, y);

    y += 4;
    y = sectionHeader('EVENT DETAILS', y);
    y = fieldRow('Event Type', data.eventType, y);
    y = fieldRow('Event Date', data.eventDate, y);
    if (data.eventTime) y = fieldRow('Event Time', data.eventTime, y);
    y = fieldRow('Venue / City', data.city, y);
    if (data.audience) y = fieldRow('Audience Size', data.audience + ' people', y);

    if (data.details) {
        y += 4;
        y = sectionHeader('SPECIAL REQUIREMENTS', y);
        doc.setTextColor(235, 225, 245);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        var lines = doc.splitTextToSize(data.details, W - 40);
        doc.text(lines, 20, y);
        y += lines.length * 6 + 4;
    }

    // Status badge
    y += 6;
    doc.setFillColor(255, 216, 107);
    doc.roundedRect(15, y, W - 30, 14, 3, 3, 'F');
    doc.setTextColor(36, 18, 46);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('STATUS: BOOKING REQUEST SUBMITTED', W / 2, y + 9.5, { align: 'center' });

    // Note
    y += 20;
    doc.setTextColor(160, 150, 170);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    var note = 'This document confirms that your booking request has been sent. The artist team will contact you within 48 hours to confirm availability, pricing and further arrangements.';
    var noteLines = doc.splitTextToSize(note, W - 30);
    doc.text(noteLines, W / 2, y, { align: 'center' });

    // Contact
    y += noteLines.length * 5 + 8;
    doc.setTextColor(255, 216, 107);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Contact: sujataguravkammar@gmail.com  |  +91 9060887575  |  Dharwad, Karnataka', W / 2, y, { align: 'center' });

    // Footer gold bar
    doc.setFillColor(255, 216, 107);
    doc.rect(0, H - 2, W, 2, 'F');

    // Reference number
    var refNo = 'SG-' + Date.now().toString().slice(-8);
    doc.setTextColor(100, 90, 110);
    doc.setFontSize(7);
    doc.text('Ref: ' + refNo, 15, H - 6);
    doc.text('sujata-vocalist.vercel.app', W - 15, H - 6, { align: 'right' });

    doc.save('Sujata_Gurav_Booking_' + refNo + '.pdf');
}

// ---------- CHATBOT ----------
var chatOpen = false;
var chatHistory = [];
var suggestionsShown = false;

var chatKnowledge = {
    greetings: ['hello','hi','hey','namaste','good morning','good evening','good afternoon'],
    booking: ['book','booking','hire','perform','performance','event','concert','wedding','show','fee','cost','price','charge'],
    bio: ['who','about','biography','background','story','born','family','training','gharana','kirana'],
    music: ['music','song','sing','voice','genre','style','classical','hindustani','raga','thumri','bhajan','devotional'],
    contact: ['contact','phone','email','reach','call','whatsapp','number','location','address','dharwad'],
    awards: ['award','achievement','honor','honour','recognition','prize','title','won'],
    youtube: ['youtube','video','watch','channel','playlist','online'],
    events: ['event','upcoming','concert','show','program','performance','tour'],
    social: ['instagram','facebook','social','follow','online presence'],
};

var chatAnswers = {
    greetings: "Namaste! \uD83D\uDE4F I'm Sujata's virtual assistant. I can help you learn about Vidushi Sujata Gurav Kammar, her music, upcoming events, and booking. What would you like to know?",
    booking: "To book Vidushi Sujata Gurav Kammar for your event:\n\n\uD83D\uDCCB Fill in the Artist Booking form above in the Booking section\n\uD83D\uDCE7 Email: sujataguravkammar@gmail.com\n\uD83D\uDCDE Phone: +91 9060887575\n\nShe performs at weddings, concerts, college events, cultural festivals, and private gatherings across India.",
    bio: "Vidushi Sujata Gurav Kammar is an accomplished Hindustani Classical vocalist of the Kirana Gharana tradition, born on 19 November 1973.\n\nShe trained under her father Late Pandit Sangameshwar Gurav, and later under her brother Pandit Kaivalya Kumar Gurav. She holds an M.A. in Music from Karnataka University, Dharwad, and serves as Guest Faculty at Karnataka Arts College.",
    music: "Sujata ji is a Hindustani Classical vocalist specializing in the Kirana Gharana style. Her repertoire includes:\n\n\uD83C\uDFB5 Classical Ragas\n\uD83C\uDFB5 Vachana & Dasavani\n\uD83C\uDFB5 Abhang & Bhajan\n\uD83C\uDFB5 Thumri & Natya Sangeet\n\uD83C\uDFB5 Devotional & Contemporary\n\nShe is known for her expressive rendition of ragas, intricate taans, murkis, and deep emotional expression.",
    contact: "\uD83D\uDCE7 Email: sujataguravkammar@gmail.com\n\uD83D\uDCDE Phone: +91 9060887575\n\uD83D\uDCCD Location: Dharwad, Karnataka\n\nYou can also use the booking and message forms on this page to get in touch directly.",
    awards: "Vidushi Sujata Gurav has received numerous prestigious awards:\n\n\uD83C\uDFC6 Manik Varma Award \u2013 Pune Gayan Samaj\n\uD83C\uDFC6 Sangeet Vikas Ratna\n\uD83C\uDFC6 Swara Saraswati Title\n\uD83C\uDFC6 Vocational Excellence Award \u2013 Rotary Club, Dharwad\n\uD83C\uDFC6 Tappa-Thumri Award \u2013 South Central Zone Cultural Centre, Nagpur\n\uD83C\uDFC6 Dashakada Sadhakaru honour\n\uD83C\uDFC6 Naada Habba Outstanding Artist Award\n\uD83C\uDFC6 Avva Award for contribution to music",
    youtube: "Watch Sujata ji's performances on YouTube!\n\n\u25B6\uFE0F YouTube: @SujataGurav1\nhttps://youtube.com/@sujatagurav1\n\nFind live concerts, classical recitals, music videos and more.",
    events: "Sujata ji performs at major music festivals across India:\n\n\uD83C\uDFB5 Hari Vallabh Samaroh, Jalandhar\n\uD83C\uDFB5 Tansen Sangeet Samaroh, Gwalior\n\uD83C\uDFB5 Naadam, Kolkata\n\uD83C\uDFB5 Ramanavami Music Festival, Mysuru\n\uD83C\uDFB5 Sangeetotsava, Dharwad & Hubballi\n\nCheck the Events section on this page for upcoming shows!",
    social: "Follow Sujata Gurav on social media:\n\n\uD83D\uDCFA YouTube: @sujatagurav1\n\uD83D\uDCF7 Instagram: @sujata_gurav_kammar\n\uD83D\uDCD8 Facebook: Sujata Gurav Kammar\n\nFind performances, reels, and updates!"
};

var suggestions = [
    'Tell me about Sujata',
    'How to book?',
    'What music does she sing?',
    'Awards & achievements',
    'Contact info',
    'Watch on YouTube'
];

function toggleChatbot() {
    var win = document.getElementById('chatbotWindow');
    chatOpen = !chatOpen;
    if (chatOpen) {
        win.classList.add('open');
        if (chatHistory.length === 0) {
            appendBotMessage("Namaste! \uD83D\uDE4F I'm your musical guide. Ask me anything about Vidushi Sujata Gurav \u2014 her biography, music, bookings, awards, or upcoming events!");
            if (!suggestionsShown) {
                showSuggestions();
                suggestionsShown = true;
            }
        }
    } else {
        win.classList.remove('open');
    }
}

function showSuggestions() {
    var el = document.getElementById('chatSuggestions');
    if (!el) return;
    el.innerHTML = suggestions.map(function (s) {
        return '<div class="chat-suggestion" onclick="handleChatSuggestion(\'' + s.replace(/'/g, "\\'") + '\')">' + s + '</div>';
    }).join('');
}

function handleChatSuggestion(text) {
    sendChatMessage(text);
    var el = document.getElementById('chatSuggestions');
    if (el) el.innerHTML = '';
}

function appendBotMessage(text) {
    var msgs = document.getElementById('chatMessages');
    if (!msgs) return;
    var div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    chatHistory.push({ role: 'bot', text: text });
}

function appendUserMessage(text) {
    var msgs = document.getElementById('chatMessages');
    if (!msgs) return;
    var div = document.createElement('div');
    div.className = 'chat-msg user';
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    chatHistory.push({ role: 'user', text: text });
}

function showTyping() {
    var msgs = document.getElementById('chatMessages');
    if (!msgs) return null;
    var div = document.createElement('div');
    div.className = 'chat-msg bot typing-indicator';
    div.id = 'typingIndicator';
    div.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
}

function removeTyping() {
    var el = document.getElementById('typingIndicator');
    if (el) el.remove();
}

function getChatResponse(input) {
    var lower = input.toLowerCase();
    for (var key in chatKnowledge) {
        var keywords = chatKnowledge[key];
        for (var i = 0; i < keywords.length; i++) {
            if (lower.indexOf(keywords[i]) !== -1) {
                return chatAnswers[key];
            }
        }
    }
    return "I'm not sure about that specific question, but I can tell you about:\n\n\u2022 Sujata ji's biography and training\n\u2022 Her music style and repertoire\n\u2022 Awards and achievements\n\u2022 How to book her for your event\n\u2022 Upcoming events and concerts\n\u2022 YouTube and social media\n\nWhat would you like to know?";
}

function sendChatMessage(textOverride) {
    var input = document.getElementById('chatInput');
    var text = textOverride || (input ? input.value.trim() : '');
    if (!text) return;

    appendUserMessage(text);
    if (input) input.value = '';

    var typing = showTyping();
    setTimeout(function () {
        removeTyping();
        var response = getChatResponse(text);
        appendBotMessage(response);
    }, 800 + Math.random() * 400);
}

function handleChatKeydown(e) {
    if (e.key === 'Enter') sendChatMessage();
}

// ---------- VIDEO MODAL ----------
function openVideo(videoId) {
    var modal = document.getElementById('videoModal');
    var frame = document.getElementById('videoFrame');
    if (!modal || !frame) return;
    frame.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    var modal = document.getElementById('videoModal');
    var frame = document.getElementById('videoFrame');
    if (modal) modal.classList.remove('open');
    if (frame) frame.src = '';
    document.body.style.overflow = '';
}

// Close modal on backdrop click
document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'videoModal') closeVideo();
});

// ---------- LEARN MORE ----------
function learnmore() {
    window.location.href = 'learn';
}

// ---------- REEL SCROLL ----------
function scrollReel(dir) {
    var track = document.getElementById('reelTrack');
    if (!track) return;
    var card = track.querySelector('.reel-card');
    var cardWidth = card ? (card.offsetWidth + 16) : 216; // card width + gap
    track.scrollBy({ left: dir * cardWidth * 2, behavior: 'smooth' });
    setTimeout(updateReelDots, 400);
}

function updateReelDots() {
    var track = document.getElementById('reelTrack');
    var dots = document.querySelectorAll('.reel-dot');
    if (!track || !dots.length) return;
    var card = track.querySelector('.reel-card');
    var cardWidth = card ? (card.offsetWidth + 16) : 216;
    var idx = Math.round(track.scrollLeft / cardWidth);
    dots.forEach(function(d, i) {
        d.classList.toggle('active', i === idx);
    });
}

function initReelDots() {
    var track = document.getElementById('reelTrack');
    var dotsContainer = document.getElementById('reelDots');
    if (!track || !dotsContainer) return;
    var cards = track.querySelectorAll('.reel-card');
    dotsContainer.innerHTML = '';
    cards.forEach(function(_, i) {
        var dot = document.createElement('button');
        dot.className = 'reel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Reel ' + (i + 1));
        dot.onclick = function() {
            var c = track.querySelector('.reel-card');
            var cw = c ? (c.offsetWidth + 16) : 216;
            track.scrollTo({ left: i * cw, behavior: 'smooth' });
            setTimeout(updateReelDots, 400);
        };
        dotsContainer.appendChild(dot);
    });
    track.addEventListener('scroll', function() {
        clearTimeout(track._scrollTimer);
        track._scrollTimer = setTimeout(updateReelDots, 150);
    });
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', function () {
    // Initialize calendar
    renderCalendar();
    // Initialize reel dots
    initReelDots();
    // Show top button on load if needed
    var btn = document.getElementById('topBtn');
    if (btn) btn.style.display = 'none';
});
