FROM java:8
ARG JAR_FILE=build/libs/*.war
COPY ${JAR_FILE} ROOT.war
ENTRYPOINT ["java", "-jar", "ROOT.war"]