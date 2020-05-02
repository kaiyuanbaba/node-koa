Websocket: 双向通信
    socket.io —— 兼容
node：服务器
数据库：MySQL
    Node操作数据库
    1.mysql模块
        mysql.createConnection
        mysql.createPool
    2. SQL语言
        4大基本语句--增删改查

        增
            INSERT INTO 表（字段列表） VALUES(值)

            INSERT INTO user_table (username,password,online) VALUES('wangwu','987654',0);
        删
            DELETE FROM 表 WHERE 条件

            DELETE FROM user_table WHERE ID=3
        改
            UPDATE 表 SET 字段=新值,字段=新值 WHERE 条件

            UPDATE user_table SET password='111111' WHERE ID=2
        查
            SELECT 字段列表（*） FROM 表 WHERE 条件

            SELECT username,online FROM user_table WHERE ID=1;
------------------------------------------------------------------------
接口：
    用户注册-- /res?user=xxxxx&pass=xxxx
                {"code"; 0, "msg": "信息"}
    用户登录： /login?user=xxxx&pass=xxxx
                {"code"; 0, "msg": "信息"}
    
