package "libxml2-dev"
package "libxslt1-dev"

python_pip "flask" do
    action :install
end

python_pip "nose" do
    action :install
end

python_pip "selenium" do
    action :install
end

python_pip "requests" do
    action :install
end

python_pip "git+https://github.com/wkral/riak-python-client.git@new_backends" do
    action :install
end

python_pip "py-bcrypt" do
    action :install
end

python_pip "lxml" do
    action :install
end

python_pip "pycrypto" do
    action :install
end

python_pip "python-dateutil" do
    action :install
    version "1.5"
end

python_pip "simplejson" do
    action :install
end

python_pip "redis" do
    action :install
end
