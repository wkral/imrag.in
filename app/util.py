import re


def urlify(name):
    return re.sub('[^A-Za-z0-9]+', '-', name).lower()


def find_phone(contacts):
    print contacts
    for contact in contacts:
        if contact['type'] == 'Telephone':
            return format_phone(contact['value'])


def format_phone(phone):
    phone = re.sub('[^0-9]', '', phone)
    if len(phone) == 10:
        return "+1{}".format(phone)
    if len(phone) == 11 and phone.startswith(1):
        return "+{}".format(phone)
