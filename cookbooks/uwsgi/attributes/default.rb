default[:uwsgi][:socket] = '/tmp/uwsgi.sock'
default[:uwsgi][:master] = true
default[:uwsgi][:processes] = 2
default[:uwsgi][:app_dir] = default.base.app_dir
default[:uwsgi][:module] = 'dev'
default[:uwsgi][:callable] = 'app'
default[:uwsgi][:user] = 'www-data'
default[:uwsgi][:group] = 'www-data'
