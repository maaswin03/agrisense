import cv2
from pathlib import Path
from ultralytics import YOLO

model = YOLO('yolov8n.pt')

dataset_dir = Path("animals")

def detect_objects(frame):

    results = model(frame)

    if results:
        for result in results:
            if result.boxes:
                for box in result.boxes[0]:
                    if len(box) >= 6:
                        class_index = int(box[5])
                        confidence = box[4]
                        if confidence > 0.5:
                            x1, y1, x2, y2 = map(int, box[:4])
                            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                            cv2.putText(frame, f'Animal: {confidence:.2f}', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    return frame

cam = cv2.VideoCapture(0)
cv2.namedWindow("Object Detection")

while True:
    ret, frame = cam.read()
    if not ret:
        print("Issue reading frame")
        break

    annotated_frame = detect_objects(frame)

    cv2.imshow("Object Detection", annotated_frame)
    
    k = cv2.waitKey(1)
    if k % 256 == 27: 
        print("Escape hit, closing...")
        break
cam.release()
cv2.destroyAllWindows()