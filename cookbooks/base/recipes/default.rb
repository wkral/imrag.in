package "python-setuptools"
package "curl"

apt_repository "nginx" do
    uri "http://ppa.launchpad.net/nginx/stable/ubuntu"
    distribution node['lsb']['codename']
    components ["main"]
    keyserver "keyserver.ubuntu.com"
    key "C300EE8C"
end

apt_repository "redis" do
    uri "http://ppa.launchpad.net/rwky/redis/ubuntu"
    distribution node['lsb']['codename']
    components ["main"]
    keyserver "keyserver.ubuntu.com"
    key "5862E31D"
end

directory File.join(node.base.home_dir, "bin/") do
    owner node.base.user
    group node.base.group
end

file File.join(node.base.home_dir, 'bin/remount') do
    content <<-EOH
    #!/bin/bash

    sudo mount -t vboxsf -o rw,uid=1000,gid=1000 v-root /vagrant
    EOH
    owner node.base.user
    group node.base.group
    mode "0755"
end
