using UnityEngine;
using System.Collections;

public class PlayerNinjaMovement : MonoBehaviour 
{
	private Animator animator;
	private float time = 0.0f;
	public float maxTime = 0.85f;

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

		if (teleporting) {
			if (Input.GetButtonDown ("Fire1")) {
				if (time > maxTime) {
					tpAttack = true;
				} else {
					Debug.Log ("DOUBLE");
					tpCombo = true;
				}
				time = 0.0f;
			}
			return;
		}

		if (Input.GetButtonDown ("Fire1"))		{
			if (time > maxTime) animator.SetTrigger ("Attack1Trigger");
			else animator.SetTrigger ("ComboAttack");

			time = 0.0f;
		}
			
		//Get input from controls
		float z = Input.GetAxisRaw("Horizontal");
		float x = -(Input.GetAxisRaw("Vertical"));
		inputVec = new Vector3(x, 0, z);

		//Apply inputs to animator
		animator.SetFloat("Input X", z);
		animator.SetFloat("Input Z", -(x));

		if (x != 0 || z != 0 ) {
			//if there is some inputset that character is moving
			animator.SetBool("Moving", true);
			animator.SetBool("Running", true);
		}
		else {
			//character is not moving
			animator.SetBool("Moving", false);
			animator.SetBool("Running", false);
		}

		if (Input.GetButtonDown("Fire1"))		{
			animator.SetTrigger("Attack1Trigger");
		}


		if (Input.GetButtonDown("Fire2"))		{
			animator.SetTrigger("ParryTrigger");
			GetComponent<Rigidbody>().AddForce(Vector3.back);
		}

		if (Input.GetButtonDown("Jump") && collider) {
			Debug.Log ("JUMP");
			animator.SetTrigger ("JumpTrigger");
			GetComponent<Rigidbody>().AddForce(Vector3.up * 2000.0f);
		}

		UpdateMovement();  //update character position and facing
	}








	public IEnumerator COStunPause(float pauseTime)	{
		yield return new WaitForSeconds(pauseTime);
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
	void RotateTowardMovementDirection()  
	{
		if (inputVec != Vector3.zero)
		{
			transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(targetDirection), Time.deltaTime * rotationSpeed);
		}
	}

	void UpdateMovement()
	{
		//get movement input from controls
		Vector3 motion = inputVec;

		//reduce input for diagonal movement
		motion *= (Mathf.Abs(inputVec.x) == 1 && Mathf.Abs(inputVec.z) == 1)?.7f:1;

		RotateTowardMovementDirection();  
		GetCameraRelativeMovement();  
	}
	void OnCollisionEnter(Collision col) {
		Debug.Log ("CollisionEnter");
		collider = true;
	}

	void OnCollisionExit(Collision col) {
		Debug.Log ("CollisionExit");
		collider = false;
	}
}