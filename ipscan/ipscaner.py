from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.common.exceptions import WebDriverException
from time import sleep, localtime, strftime
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

        retry_count = 0
        date = strftime("%D", localtime())
        timer = strftime("%H:%M", localtime())

        while True:
            try:
                driver.get(f"http://{self.router_ip}{self.url_path}")
                username_element = WebDriverWait(driver, 10).until(
                    ec.presence_of_element_located((By.CLASS_NAME, "input-form-login.username"))
                )

                password_element = WebDriverWait(driver, 10).until(
                    ec.presence_of_element_located((By.CLASS_NAME, "input-form-login.password"))
                )

                username_element.send_keys(self.username)
                password_element.send_keys(self.password)

                submit = driver.find_element(by=By.CLASS_NAME, value="btn-signin")
                submit.click()
                sleep(5)
                print("เข้าสู่ระบบสำเร็จ")
                retry_count = 0
                break

            except WebDriverException:
                print("เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ต ERR_CONNECTION_TIMED_OUT")
                print("จะทำการเข้าสู่ระบบใหม่อีกครั้ง", retry_count)
                retry_count += 1
                log = open("log.txt", "a")
                log.write("{} : {} : ERR_CONNECTION_TIMED_OUT\n".format(date, timer))
                log.close()
                continue

            except:
                print("เกิดข้อผิดพลาดที่ไม่สามารถระบุได้ จะทำการปิดระบบ")
                log = open("log.txt", "a")
                log.write("{} : {} : UNKNOWN_ERR \n".format(date, timer))
                log.close()
                exit()

        return driver


def check_mac(address, io):
    db = mysql.connector.connect(
        host="127.0.0.1",
        user="root",
        password="",
        database="rsw_management"
    )

    year = str(localtime().tm_year + 543)
    date = strftime("%m%d", localtime())

    cursor = db.cursor()
    cursor.execute(" SELECT emp_id, emp_mac FROM EMPLOYEE WHERE emp_status > '0' ")
    emp = cursor.fetchall()

    cursor.execute(" SELECT emp_id, time_out FROM TIME_ATTENDANCE WHERE work_id = %s ", (year + date,))
    timeAttendance = cursor.fetchall()
    timeAttendance_emp = list(row[0] for row in timeAttendance)
    timeAttendance_out = [str(row[1]) for row in timeAttendance]

    if io == 'in':
        for m in emp:
            timer = strftime("%H:%M:00", localtime())
            if m[1] in address:
                if len(timeAttendance_emp) == len(emp):
                    break
                elif m[0] not in timeAttendance_emp:
                    sql = "INSERT INTO TIME_ATTENDANCE (time_in, time_out, work_id, emp_id) VALUES (%s, %s, %s, %s)"
                    val = (timer, "00:00:00", year + date, m[0])
                    cursor.execute(sql, val)
                    db.commit()
                else:
                    pass
            else:
                pass

    elif io == 'out':
        for m in emp:
            timer = strftime("%H:%M:00", localtime())
            if "00:00:00" not in timeAttendance_out:
                break
            elif m[0] in timeAttendance_emp and m[1] not in address:
                for t in timeAttendance:
                    if t[0] == m[0] and str(t[1]) != "00:00:00":
                        sql = "UPDATE TIME_ATTENDANCE SET time_out = %s WHERE work_id = %s AND emp_id = %s"
                        val = (timer, m[0], year + date)
                        cursor.execute(sql, val)
                        db.commit()
                    else:
                        pass
            else:
                pass


def get_data(driver, io):
    try:
        attached_element = WebDriverWait(driver, 10).until(
            ec.presence_of_element_located((By.CLASS_NAME, "click-topo"))
        )

        attached_element.click()

    finally:
        data = driver.find_element(by=By.CLASS_NAME, value="el-dialog").text
        check_mac(data, io)


def main():
    router = Router()
    session = router.router_Login()
    count_login = 1

    while True:
        current = localtime().tm_hour
        if current < 7:
            sleep(3600)

        elif current > 18:
            sleep(43200)

        elif current > 10:
            sleep(23400)

        elif 7 < current < 10 and session.current_url == 'http://192.168.10.1/#/home':
            print('Time In')
            get_data(session, 'in')
            session.refresh()
            sleep(60)

        elif 16 < current < 18 and session.current_url == 'http://192.168.10.1/#/home':
            print('Time Out')
            get_data(session, 'out')
            session.refresh()
            sleep(300)

        else:
            print('Round Login :', count_login)
            session = router.router_Login()
            count_login += 1


# main()
