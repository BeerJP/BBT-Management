from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from time import sleep, localtime, strftime


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
    mac = [
        ['66:9B:53:06:2C:5A', 'เบียร์'],
        ['58:D6:97:62:52:A1', 'เต้'],
        ['D0:1B:49:40:19:26', 'เจ๋ง'],
        ['E8:6D:CB:6C:BB:5A', 'โต้'],
        ['46:3E:02:89:9B:26', 'เอ้'],
        ['98:C8:B8:D9:8A:29', 'เบล'],
        ['9C:82:81:4B:78:B3', 'เกต'],
        ['32:A7:96:1D:C4:27', 'วัช'],
        ['32:04:73:91:04:9E', 'ทา']
    ]

    for m in mac:
        timer = strftime("%a %d %b %Y %H:%M:%S", localtime())
        if m[0] in address:
            print(timer, m[1])
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