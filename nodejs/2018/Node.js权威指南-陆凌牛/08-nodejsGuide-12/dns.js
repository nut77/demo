const dns = require('dns');

let domian = 'baidu.com';
let ip = '202.165.102.205';

// 利用resolve方法将域名解析为DNS记录
// 裸域名只能绑定DNS的A记录，不能绑定CNAME记录
let resolveCallback = (err, data) => {

    if (err) {

        console.log(`域名解析错误：${err}`);
    } else {

        console.log(data);
    }
};
dns.resolve4(domian, resolveCallback); // IPv4地址 A 【操作《==》dns.resolve(domain, 'A', cb);】
dns.resolve6(domian, resolveCallback); // IPv6地址 AAAA
dns.resolveMx(domian, resolveCallback); // 邮件交互服务器记录
dns.resolveTxt(domian, resolveCallback); // 该域名附加的描述记录
dns.resolveSrv(domian, resolveCallback); // 服务记录
dns.resolveNs(domian, resolveCallback); // 域名服务器记录
dns.resolveCname(domian, resolveCallback); // 域名别名记录

// 使用lookup方法查询IP地址  返回第一个被发现的IPv4或IPv6地址
dns.lookup(domian, 4, (err, addr, family) => {

   console.log("=====lookup======");
   console.log(addr);
});

// 使用reverse反向解析IP地址
dns.reverse(ip, (err, domains) => {

    console.log("=====reverse======");
    if (err) {

        console.log(`reverse域名解析错误：${err}`);
    } else {

        console.log(domains);
    }
});

