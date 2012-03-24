require_recipe "python"

package "python2.7-dev"
package "libssl-dev"
package "libxml2-dev"

python_pip "uwsgi" do
    action :install
    version "1.0.4"
end

# currently only supported with a python source install
# Not sure where site-package binaries end up with a package install
node.default.uwsgi.bin_path = File.join(node.default.python.prefix_dir, 'bin')

template '/etc/init.d/uwsgi' do
    owner 'root'
    group 'root'
    mode  '0755'
    source 'uwsgi-init.erb'
end

template '/etc/default/uwsgi' do
    owner 'root'
    group 'root'
    mode  '0644'
    source 'uwsgi-default.erb'
    notifies :reload, "service[uwsgi]"
end

service "uwsgi" do
    supports :start => true, :stop => true, :restart => true, :reload => true
    action [:enable, :start]
end

