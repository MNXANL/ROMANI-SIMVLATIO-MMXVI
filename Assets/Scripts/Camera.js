#pragma strict

public var mouseRotVelX : float = 5.0f;
public var mouseRotVelY : float = 5.0f;
public var zoom : float = 2.0f;
public var isYAxisInverted : int = 1;

private var fixPosition : boolean;
private var mouseRotX : float = 0.0f;
private var mouseRotY : float = 0.0f;

public var player : GameObject;


function Start () {
	Cursor.visible = false;
}

function Update () {
	//if( /* !Input.GetKey(KeyCode.W) && !Input.GetKey(KeyCode.A) &&*/ !Input.GetKey(KeyCode.S) && !Input.GetKey(KeyCode.D)) {
		transform.rotation = Quaternion();
		var rotX : float = Input.GetAxis("Mouse X") * mouseRotVelX;
		var rotY : float = Input.GetAxis("Mouse Y") * mouseRotVelY;
		mouseRotX += rotX;
		mouseRotY -= rotY*isYAxisInverted;
		if(mouseRotX < 5)	mouseRotX = 5;
		if(mouseRotX > 50)	mouseRotX = 50;
		
		transform.eulerAngles = Vector3(mouseRotX, mouseRotY, 0.0f);
	//}
	transform.position = player.transform.position - transform.forward * zoom + Vector3(0.0f, 2.5f, 0.0f);
}