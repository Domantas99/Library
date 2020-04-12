#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim
ADD ./ /app
ENV ASPNETCORE_URLS=http://*:8080
WORKDIR /app
ENTRYPOINT ["dotnet", "BookLibrary.API.dll"]