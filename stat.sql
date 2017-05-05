SELECT datname, count(0) as connections, state
FROM pg_stat_activity
group by datname, state
order by connections;

SELECT count(0) as connections
FROM pg_stat_activity;

-- count lock only
--select count(0) as locks from pg_locks where mode = 'ExclusiveLock';

-- see all locks
select datname,substring(query,0,100) as locked_queries,query_start,state_change
from pg_locks
inner join pg_stat_activity on pg_stat_activity.pid=pg_locks.pid
where mode = 'ExclusiveLock';
