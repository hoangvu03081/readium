FROM python:3.7

ARG PORT=3000
ENV PORT ${PORT}

EXPOSE ${PORT}

WORKDIR /app 

COPY requirements.txt /app
RUN pip3 install -r requirements.txt --no-cache-dir

COPY . /app 

ENTRYPOINT ["python3"] 
CMD ["app.py"]