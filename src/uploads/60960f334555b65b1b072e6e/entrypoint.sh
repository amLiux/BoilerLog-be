#!/bin/bash

JDK=$(find /opt/auth-control-standalone/libs -name *jdk15on*)
ACS=$(find /opt/auth-control-standalone/libs -name auth-control-standalone-*-all.jar)

echo "JDK: $JDK"
echo "ACS: $ACS"

java -cp $JDK:$ACS -Djava.library.path=/opt/auth-control-standalone/libs -Dlogback.configurationFile=/opt/auth-control-standalone/config/logback.xml -server -Djdk.tls.rejectClientInitiatedRenegotiation=true -Dfile.encoding=utf-8 -Xms2G -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=dump`date+%d%m%Y-%H%M`.hprof -server -XX:+UseStringDeduplication -XX:+UseG1GC -XX:MaxGCPauseMillis=200 com.transmitsecurity.server.Server