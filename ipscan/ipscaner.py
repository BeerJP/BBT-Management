from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from time import sleep, localtime, strftime, time
import mysql.connector


class Router:
    def __init__(self):
        self.router_ip = "192.168.10.1"
        self.url_path = "/#/"
        self.username = 'admin'
        self.password = 'aisadmin'

    def router_Login(self):
        op = webdriver.ChromeOptions()
        op.add_argument('headless')
        driver = webdriver.Chrome(options=op)
        driver.get(f"http://{self.router_ip}{self.url_path}")

        try:
            username_element = WebDriverWait(driver, 10).until(
                ec.presence_of_element_located((By.CLASS_NAME, "input-form-login.username"))
            )

            password_element = WebDriverWait(driver, 10).until(
                ec.presence_of_element_located((By.CLASS_NAME, "input-form-login.password"))
            )

            username_element.send_keys(self.username)
            password_element.send_keys(self.password)

        finally:
            submit = driver.find_element(by=By.CLASS_NAME, value="btn-signin")
            submit.click()
            sleep(5)

        return driver


def check_mac(address):
    db = mysql.connector.connect(
        host="127.0.0.1",
        user="root",
        password="",
        database="rsw_management"
    )

    year = str(localtime().tm_year + 543)
    date = strftime("%m%d", localtime())

    cursor = db.cursor()
    cursor.execute(" SELECT emp_id, emp_mac1, emp_mac2 FROM EMPLOYEE WHERE emp_status > '0' ")
    emp = cursor.fetchall()

    cursor.execute(" SELECT emp_id FROM TIME_ATTENDANCE WHERE work_id = %s ", (year + date,))
    timeAttendance = cursor.fetchall()
    timeAttendance_list = list(row[0] for row in timeAttendance)

    for m in emp:
        timer = strftime("%H:%M:00", localtime())
        if m[1] in address or m[2] in address:
            if m[0] not in timeAttendance_list:
                sql = "INSERT INTO TIME_ATTENDANCE (time_in, time_out, work_id, emp_id) VALUES (%s, %s, %s, %s)"
                val = (timer, "00:00:00", year + date, m[0])
                cursor.execute(sql, val)
                db.commit()
            else:
                print(m[0], "Already Insert")
        else:
            pass


def get_data(driver):
    try:
        attached_element = WebDriverWait(driver, 10).until(
            ec.presence_of_element_located((By.CLASS_NAME, "click-topo"))
        )

        attached_element.click()

    finally:
        data = driver.find_element(by=By.CLASS_NAME, value="el-dialog").text
        check_mac(data)


def main():
    router = Router()
    session = router.router_Login()
    count = 1
    count_login = 1

    while True:
        if session.current_url == 'http://192.168.10.1/#/home':
            print('Round :', count)
            get_data(session)
            count += 1
            session.refresh()
            sleep(60)
        else:
            print('Round Login :', count_login)
            session = router.router_Login()
            count_login += 1


main()