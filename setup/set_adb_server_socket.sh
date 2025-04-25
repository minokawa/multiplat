# Cant do exports in script, add this to bash profile
export ADB_SERVER_SOCKET=tcp:$(cat /etc/resolv.conf  | grep -v '^#' | grep nameserver | awk '{print $2}'):5037
