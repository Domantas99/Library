FROM microsoft/mssql-server-linux:2017-latest

ENV SA_PASSWORD=BookLibrary2020
ENV ACCEPT_EULA=Y

RUN mkdir -p /usr/config
WORKDIR /usr/config

COPY . /usr/config

RUN chmod +x /usr/config/entrypoint.sh
RUN chmod +x /usr/config/configure-db.sh

ENTRYPOINT ["./entrypoint.sh"]

# Tail the setup logs to trap the process
CMD ["tail -f /dev/null"]

HEALTHCHECK --interval=15s CMD /opt/mssql-tools/bin/sqlcmd -U sa -P $SA_PASSWORD -Q "select 1" && grep -q "MSSQL CONFIG COMPLETE" ./config.log
