package "redis-server"

template '/etc/redis/redis.conf' do
    owner 'root'
    group 'root'
    mode  '0644'
    source 'redis-conf.erb'
    notifies :reload, "service[redis-server]"
end

service "redis-server" do
    supports :start => true, :stop => true, :restart => true, :reload => true
    action [:enable, :start]
end
