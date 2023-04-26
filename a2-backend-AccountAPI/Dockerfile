FROM python:3.7-alpine
# Set application working directory
WORKDIR /app
# Copy everything into the container
ADD . /app
COPY requirements.txt /app/requirements.txt
RUN python3 -c 'import sys; f = open("/usr/local/lib/python3.7/site-packages/_manylinux.py", "w"); f.write("manylinux1_compatible = True"); f.close()'
RUN pip install -r requirements.txt
# Run application
EXPOSE 5000
CMD ["python", "application.py"]