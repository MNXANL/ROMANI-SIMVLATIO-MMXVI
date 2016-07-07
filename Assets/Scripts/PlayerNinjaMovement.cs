using UnityEngine;
using System.Collections;


public class PlayerNinjaMovement : MonoBehaviour {
	private Animator animator;
	private float time = 0.0f;
	public float maxTime = 0.75f;
	public float JumpPower = 2100f;

	private bool teleporting = false;
	private bool tpAttack = false;
	private bool tpCombo = false;

	Vector3 inputVec;
	Vector3 targetDirection;

	float rotationSpeed = 30;
	bool collider;

	//Warrior types
	public enum Warrior{Karate, Ninja, Brute, Sorceress, Knight, Mage, Archer, TwoHanded, Swordsman, Spearman, Hammer, Crossbow};

	public Warrior warrior;

	void Start() {
		animator = GetComponent<Animator> ();
	}

	void Update()	{
		time += Time.deltaTime;

		if (Input.GetButton("Fire1")) animator.SetBool("Clicking", true);
		else animator.SetBool("Clicking", false);
		animator.SetBool("Attack1Bool", false);

		if (teleporting) {
			if (Input.GetButtonDown ("Fire1")) {
				if (time < maxTime) {
					tpAttack = true;
				} else {
					Debug.Log ("DOUBLE");
					tpCombo = true;
				}
				time = 0.0f;
			}
			return;
		}

		if (Input.GetButtonDown("Fire1")) {
			if (time < maxTime) {
				animator.SetBool("Attack1Bool", true);
				animator.SetBool("AnotherATK", true);
			}
			else {
				animator.SetTrigger("ComboAttack");
				animator.SetBool("Attack1Bool", false);
				animator.SetBool("AnotherATK", true);
			}
			time = 0.0f;
		}

		//Get input from controls
		float z = Input.GetAxisRaw("Horizontal");
		float x = -(Input.GetAxisRaw("Vertical"));
		inputVec = new Vector3(x, 0, z);

		//Apply inputs to animator
		animator.SetFloat("Input X", z);
		animator.SetFloat("Input Z", -(x));

		if (collider)        {
			if (x != 0 || z != 0)  {
				//if there is some input, set that character is moving
				animator.SetBool("Moving", true);
				animator.SetBool("Running", true);
				/*if (Input.GetButtonDown("Fire3")) {
				*	StartCoroutine(COTeleport());
				}*/
			}
			else            {
				//character is not moving
				animator.SetBool("Moving", false);
				animator.SetBool("Running", false);
			}

			if (Input.GetButton("Fire2"))            {
				animator.SetBool("Defensa", true);
			}
			if (Input.GetButtonUp("Fire2"))            {
				animator.SetBool("Defensa", false);
			}
			if (Input.GetButtonDown("Jump"))            {
				Debug.Log("JUMP");
				GetComponent<Rigidbody>().AddForce(Vector3.up * JumpPower);
			}
		}
		else        {
			if (Input.GetButtonDown("Fire1"))            {
				animator.SetTrigger("Clicking2");
			}
		}

		UpdateMovement();  //update character position and facing
	}

	public IEnumerator COStunPause(float pauseTime)	{
		yield return new WaitForSeconds(pauseTime);
	}

	public IEnumerator COTeleport() {
		teleporting = true;
		time = 0.0f; 
		animator.SetBool ("Moving", false);
		animator.SetBool ("Running", false);
		Renderer renderer = GetComponentInChildren<Renderer> ();
		renderer.enabled = false;
		yield return new WaitForSeconds (0.5f);
		transform.position += transform.forward * 10.0f;
		renderer.enabled = true;
		teleporting = false;
		if (tpCombo){
			animator.SetTrigger ("ComboAttack");
		}
		else if (tpAttack) {
			animator.SetBool ("Attack1Bool", true);
		}
		animator.SetBool ("AnotherATK", false);
		tpAttack = tpCombo = false;
	}

	//converts control input vectors into camera facing vectors
	void GetCameraRelativeMovement()	{  
		Transform cameraTransform = Camera.main.transform;

		// Forward vector relative to the camera along the x-z plane   
		Vector3 forward = cameraTransform.TransformDirection(Vector3.forward);
		forward.y = 0;
		forward = forward.normalized;

		// Right vector relative to the camera
		// Always orthogonal to the forward vector
		Vector3 right= new Vector3(forward.z, 0, -forward.x);

		//directional inputs
		float v= Input.GetAxisRaw("Vertical");
		float h= Input.GetAxisRaw("Horizontal");

		// Target direction relative to the camera
		targetDirection = h * right + v * forward;
	}

	//face character along input direction
	void RotateTowardMovementDirection()  	{
		if (inputVec != Vector3.zero)
		{
			transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(targetDirection), Time.deltaTime * rotationSpeed);
		}
	}

	void UpdateMovement()	{
		//get movement input from controls
		Vector3 motion = inputVec;

		//reduce input for diagonal movement
		motion *= (Mathf.Abs(inputVec.x) == 1 && Mathf.Abs(inputVec.z) == 1)?.7f:1;

		RotateTowardMovementDirection();  
		GetCameraRelativeMovement();  
	}


	void OnCollisionEnter(Collision col) {
		Debug.Log ("CollisionEnter");
		animator.SetBool("InAir", false);
		collider = true;
	}

	void OnCollisionExit(Collision col) {
		Debug.Log ("CollisionExit");
		animator.SetBool("InAir", true);
		collider = false;
	}
}