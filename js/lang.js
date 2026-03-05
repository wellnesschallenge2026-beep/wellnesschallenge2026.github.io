// ============================================================
//  Wellness Challenge 2026 — Language / i18n
// ============================================================

const LANG = {
    th: {
        // Navigation
        nav_dashboard: "หน้าหลัก",
        nav_profile: "โปรไฟล์",
        nav_ranking: "อันดับ",
        nav_logout: "ออกจากระบบ",
        nav_admin: "แอดมิน",

        // Login page
        login_title: "Wyndham Hua Hin<br>Wellness Challenge 2026",
        login_subtitle: "ยินดีต้อนรับ! เข้าสู่ระบบเพื่อเริ่มต้น",
        login_user_ph: "ชื่อผู้ใช้",
        login_password: "รหัสผ่าน",
        login_btn: "เข้าสู่ระบบ",
        login_error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",

        // Dashboard
        dash_welcome: "สวัสดี",
        dash_subtitle: "เลือกกิจกรรมที่คุณทำวันนี้",
        dash_log_btn: "บันทึกกิจกรรม",
        dash_rules: "กฎกติกา",
        dash_progress: "ความคืบหน้าสัปดาห์นี้",

        // Activities
        act_no_fry: "No Fry, Let's Try!",
        act_running: "Running & Walking",
        act_steps: "Step Count",
        act_yoga: "Yoga & Aerobic",
        act_football: "Football",
        act_my_design: "Your Design",

        act_no_fry_desc: "ไม่ทานอาหารทอด ทางเลือกสุขภาพ (3 วัน/สัปดาห์)",
        act_running_desc: "วิ่ง 10 km/สัปดาห์ หรือ เดิน 15 km/สัปดาห์ (3 ครั้ง/สัปดาห์)",
        act_steps_desc: "Office 5,000 ก้าว / Operation 10,000 ก้าวต่อวัน (4 ครั้ง/สัปดาห์)",
        act_yoga_desc: "26 sessions หรือ 80% การเข้าร่วม",
        act_football_desc: "เล่นบอล 3 วัน/สัปดาห์",
        act_my_design_desc: "ตั้ง Challenge เองตามสไตล์ของคุณ",

        // Form fields
        form_date: "วันที่",
        form_time: "เวลา",
        form_location: "สถานที่",
        form_distance: "ระยะทาง (km)",
        form_type: "ประเภท",
        form_run: "วิ่ง",
        form_walk: "เดิน",
        form_steps: "จำนวนก้าว",
        form_duration: "ระยะเวลา (นาที)",
        form_days: "จำนวนวัน",
        form_session: "ครั้งที่",
        form_note: "ชื่อเมนู",
        form_challenge: "ชื่อ Challenge",
        form_desc: "รายละเอียด",
        form_photo: "อัพโหลดหลักฐาน",
        form_sub_act: "เลือกกิจกรรม",
        sub_tennis: "เทนนิส",
        sub_jump_rope: "กระโดดเชือก 250 ครั้ง",
        sub_fishing_walk: "เดินตกปลาอย่างน้อย 5 ก.ม. ต่อครั้ง",
        sub_weight_training: "Weight Training",
        sub_less_meat: "Less Meat",
        sub_low_carb: "Low Carb",
        sub_water: "ดื่มน้ำ 1.4 ลิตร / วัน",
        sub_black_coffee: "โอเลี้ยง เหลืออาทิตย์ละแก้ว",
        sub_no_food_evening: "ไม่กินอาหารหลัง 5-6 โมงเย็น",
        sub_plank: "Plank ขั้นต่ำ 3 นาที ทุกวัน",
        sub_other_exercise: "ออกกำลังกายอื่นๆ",
        form_employee: "ประเภทพนักงาน",
        form_yoga: "Yoga",
        form_aerobic: "Aerobic",
        form_office: "Office",
        form_operation: "Operation",
        form_submit: "บันทึก",
        form_cancel: "ยกเลิก",
        form_upload_limit: "ไฟล์ต้องมีขนาดไม่เกิน 5MB",
        form_pass_hint_alpha: "*รหัสผ่านอย่างน้อยต้องมีตัวอักษรภาษาอังกฤษผสมอยู่ (A-Z, a-z)",
        form_error: "กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง",
        form_uploading: "กำลังอัพโหลด...",

        // Profile
        prof_title: "โปรไฟล์ของฉัน",
        prof_total: "กิจกรรมทั้งหมด",
        prof_score: "คะแนนรวม",
        prof_streak: "ต่อเนื่อง (วัน)",
        prof_weekly: "สัปดาห์นี้",
        prof_history: "ประวัติกิจกรรม",
        prof_change_pic: "เปลี่ยนรูปโปรไฟล์",
        prof_upload_pic: "อัพโหลดรูป",
        prof_activity: "กิจกรรม",
        prof_date: "วันที่",
        prof_details: "รายละเอียด",
        prof_evidence: "หลักฐาน",
        prof_settings: "ตั้งค่าโปรไฟล์",
        prof_edit_username: "เปลี่ยนชื่อผู้ใช้",
        prof_edit_password: "เปลี่ยนรหัสผ่าน",
        prof_current_password: "รหัสผ่านปัจจุบัน",
        prof_new_password: "รหัสผ่านใหม่",
        prof_confirm_password: "ยืนยันรหัสผ่านใหม่",
        prof_update_btn: "บันทึกการเปลี่ยนแปลง",
        prof_update_success: "อัปเดตข้อมูลสำเร็จ!",
        prof_pass_mismatch: "รหัสผ่านใหม่ไม่ตรงกัน",
        prof_pass_alpha_req: "รหัสผ่านต้องมีตัวอักษรภาษาอังกฤษอย่างน้อย 1 ตัว",
        prof_invalid_current: "รหัสผ่านปัจจุบันไม่ถูกต้อง",
        prof_user_exists: "ชื่อผู้ใช้ี้มีผู้ใช้อยู่แล้ว",

        // Ranking
        rank_title: "อันดับผู้เข้าร่วม",
        rank_your: "อันดับของคุณ",
        rank_name: "ชื่อ",
        rank_score: "คะแนน",
        rank_rank: "อันดับ",
        rank_activities: "กิจกรรม",

        // Admin
        admin_title: "ระบบผู้ดูแล",
        admin_users: "ผู้ใช้งานทั้งหมด",
        admin_overview: "ภาพรวม",
        admin_search: "ค้นหาผู้ใช้...",
        admin_add_user: "เพิ่มผู้ใช้",
        admin_edit: "แก้ไข",
        admin_delete: "ลบ",
        admin_save: "บันทึก",
        admin_cancel: "ยกเลิก",
        admin_confirm_del: "ยืนยันการลบผู้ใช้นี้?",
        admin_fullname: "ชื่อ-นามสกุล",
        admin_username: "ชื่อผู้ใช้",
        admin_password: "รหัสผ่าน",
        admin_role: "สิทธิ์",
        admin_emp_type: "ประเภทพนักงาน",
        admin_evidence: "ดูหลักฐาน",
        admin_download: "ดาวน์โหลด",
        admin_no_evidence: "ไม่มีหลักฐาน",
        admin_total_users: "ผู้ใช้ทั้งหมด",
        admin_total_logs: "บันทึกสัปดาห์นี้",
        admin_most_active: "ผู้ใช้ที่ active มากสุด",
        admin_back: "กลับ",
        admin_chart_dist: "สัดส่วนกิจกรรม",
        admin_chart_weekly: "การบันทึกสัปดาห์นี้ (ทั้งหมด)",
        admin_participation: "อัตราเข้าร่วม",
        admin_recent: "กิจกรรมล่าสุด",
        admin_unread: "ยังไม่อ่าน",
        admin_export: "ดาวน์โหลดรายงาน",

        // General
        gen_loading: "กำลังโหลด...",
        gen_no_data: "ไม่มีข้อมูล",
        gen_view: "ดู",
        gen_close: "ปิด",
    },

    en: {
        nav_dashboard: "Dashboard",
        nav_profile: "Profile",
        nav_ranking: "Ranking",
        nav_logout: "Logout",
        nav_admin: "Admin",

        login_title: "Wyndham Hua Hin<br>Wellness Challenge 2026",
        login_subtitle: "Welcome! Sign in to get started",
        login_user_ph: "Username or Full Name",
        login_password: "Password",
        login_btn: "Sign In",
        login_error: "Invalid username or password",

        dash_welcome: "Hello",
        dash_subtitle: "Choose an activity to log today",
        dash_log_btn: "Log Activity",
        dash_rules: "Rules",
        dash_progress: "This Week's Progress",

        act_no_fry: "No Fry, Let's Try!",
        act_running: "Running & Walking",
        act_steps: "Step Count",
        act_yoga: "Yoga & Aerobic",
        act_football: "Football",
        act_my_design: "Your Design",

        act_no_fry_desc: "No fried food, healthy choices (3 days/week)",
        act_running_desc: "Run 10 km/week or Walk 15 km/week (3 sessions/week)",
        act_steps_desc: "Office 5,000 / Operation 10,000 steps/day (4 days/week)",
        act_yoga_desc: "26 sessions or 80% participation",
        act_football_desc: "Play football 3 days/week",
        act_my_design_desc: "Set your own challenge, your style",

        form_date: "Date",
        form_time: "Time",
        form_location: "Location",
        form_distance: "Distance (km)",
        form_type: "Type",
        form_run: "Run",
        form_walk: "Walk",
        form_steps: "Step Count",
        form_duration: "Duration (min)",
        form_days: "Days",
        form_session: "Session #",
        form_note: "Note",
        form_challenge: "Challenge Name",
        form_desc: "Description",
        form_photo: "Upload Evidence",
        form_sub_act: "Select Activity",
        sub_tennis: "Tennis",
        sub_jump_rope: "Jump Rope (250 times)",
        sub_fishing_walk: "Fishing Walk (min 5km)",
        sub_weight_training: "Weight Training",
        sub_less_meat: "Less Meat",
        sub_low_carb: "Low Carb",
        sub_water: "Drink 1.4L water/day",
        sub_black_coffee: "Iced black coffee once/week",
        sub_no_food_evening: "No food after 5-6 PM",
        sub_plank: "Plank min 3 mins/day",
        sub_other_exercise: "Other Exercises",
        form_employee: "Employee Type",
        form_yoga: "Yoga",
        form_aerobic: "Aerobic",
        form_office: "Office",
        form_operation: "Operation",
        form_submit: "Save",
        form_cancel: "Cancel",
        form_upload_limit: "File size must be under 5MB",
        form_pass_hint_alpha: "*Password must contain at least one letter (A-Z, a-z)",
        form_error: "Please fill in all required fields correctly",
        form_uploading: "Uploading...",

        prof_title: "My Profile",
        prof_total: "Total Activities",
        prof_score: "Total Score",
        prof_streak: "Streak (days)",
        prof_weekly: "This Week",
        prof_history: "Activity History",
        prof_change_pic: "Change Profile Picture",
        prof_upload_pic: "Upload Photo",
        prof_activity: "Activity",
        prof_date: "Date",
        prof_details: "Details",
        prof_evidence: "Evidence",
        prof_settings: "Profile Settings",
        prof_edit_username: "Change Username",
        prof_edit_password: "Change Password",
        prof_current_password: "Current Password",
        prof_new_password: "New Password",
        prof_confirm_password: "Confirm New Password",
        prof_update_btn: "Save Changes",
        prof_update_success: "Profile updated successfully!",
        prof_pass_mismatch: "New passwords do not match",
        prof_pass_alpha_req: "Password must contain at least one letter",
        prof_invalid_current: "Current password is incorrect",
        prof_user_exists: "Username already exists",

        rank_title: "Participant Rankings",
        rank_your: "Your Rank",
        rank_name: "Name",
        rank_score: "Score",
        rank_rank: "Rank",
        rank_activities: "Activities",

        admin_title: "Admin Panel",
        admin_users: "All Users",
        admin_overview: "Overview",
        admin_search: "Search users...",
        admin_add_user: "Add User",
        admin_edit: "Edit",
        admin_delete: "Delete",
        admin_save: "Save",
        admin_cancel: "Cancel",
        admin_confirm_del: "Confirm delete this user?",
        admin_fullname: "Full Name",
        admin_username: "Username",
        admin_password: "Password",
        admin_role: "Role",
        admin_emp_type: "Employee Type",
        admin_evidence: "View Evidence",
        admin_download: "Download",
        admin_no_evidence: "No evidence available",
        admin_total_users: "Total Users",
        admin_total_logs: "Logs This Week",
        admin_most_active: "Most Active User",
        admin_back: "Back",
        admin_chart_dist: "Activity Distribution",
        admin_chart_weekly: "Weekly Submissions (All)",
        admin_participation: "Participation Rate",
        admin_recent: "Recent Feed",
        admin_unread: "Unread",
        admin_export: "Export Report",

        gen_loading: "Loading...",
        gen_no_data: "No data available",
        gen_view: "View",
        gen_close: "Close",
    },
};

// Current active language
let currentLang = localStorage.getItem("wc_lang") || "th";

function t(key) {
    return (LANG[currentLang] && LANG[currentLang][key]) || key;
}

function applyLang() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            el.placeholder = t(key);
        } else {
            el.innerHTML = t(key);
        }
    });
    document.querySelectorAll("[data-i18n-title]").forEach(el => {
        el.title = t(el.getAttribute("data-i18n-title"));
    });
    // Update lang toggle buttons
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
}

function switchLang(lang) {
    currentLang = lang;
    localStorage.setItem("wc_lang", lang);
    applyLang();
    // Re-render dynamic content if needed
    if (typeof onLangSwitch === "function") onLangSwitch();
}

document.addEventListener("DOMContentLoaded", () => {
    applyLang();
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.addEventListener("click", () => switchLang(btn.dataset.lang));
    });
});
